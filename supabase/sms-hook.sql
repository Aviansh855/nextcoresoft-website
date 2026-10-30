create extension if not exists pg_net;

drop function if exists public.send_sms(jsonb);

create or replace function public.send_sms(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, vault, net
as $$
declare
  api_key text;
  phone text;
  otp text;
  form_body text;
begin
  select decrypted_secret
    into api_key
  from vault.decrypted_secrets
  where name = 'textplate_api_key'
  order by created_at desc
  limit 1;

  phone := coalesce(event #>> '{user,phone}', '');
  otp := coalesce(event #>> '{sms,otp}', '');
  phone := '+' || regexp_replace(phone, '\D', '', 'g');

  if api_key is null or api_key = '' or phone !~ '^\+[1-9][0-9]{9,14}$' or otp !~ '^[0-9]{4,8}$' then
    raise exception 'phone login SMS is not configured';
  end if;

  form_body :=
    'mobileNumber=' || replace(phone, '+', '%2B') ||
    '&templateId=e09d6413a6d6b287298a7309170f1a3d07be2bac' ||
    '&otpValue=' || otp ||
    '&expiryValue=5%20minutes';

  -- pg_net.http_post only allows a JSON body. The queue accepts the raw form body Textplate requires.
  insert into net.http_request_queue (method, url, headers, body, timeout_milliseconds)
  values (
    'POST',
    'https://api.textplate.in/v1/send-sms',
    jsonb_build_object(
      'Content-Type', 'application/x-www-form-urlencoded',
      'Authorization', 'Bearer ' || api_key
    ),
    convert_to(form_body, 'UTF8'),
    10000
  );

  -- A raw queue insert is not sent until the pg_net worker is woken.
  perform net.wake();

  return '{}'::jsonb;
end;
$$;

revoke all on function public.send_sms(jsonb) from public, anon, authenticated;
grant execute on function public.send_sms(jsonb) to supabase_auth_admin;
