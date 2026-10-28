/**
 * Static HTML snippets for prerender (crawlers / no-JS). Keep plan figures aligned with
 * src/data/dealership-pricing.ts and src/data/ai-automation-pricing.ts.
 */

function inr(n) {
  return `₹${n.toLocaleString("en-IN")}`
}

export function dealershipPricingExtra() {
  return `<h2>Plans (INR, before tax)</h2>
<ul>
<li><strong>Basic</strong> — Setup ${inr(60_000)}, ${inr(9_999)}/month, first-year total ${inr(179_988)}. Admin and employee access; customer mobile app not included.</li>
<li><strong>Medium</strong> — Setup ${inr(75_000)}, ${inr(11_999)}/month, first-year total ${inr(218_988)}. Includes customer mobile app.</li>
<li><strong>Premium</strong> — Setup ${inr(125_000)}, ${inr(19_999)}/month, first-year total ${inr(364_988)}. Advanced workflows and agreed integrations.</li>
</ul>
<p><a href="https://nextcoresoft.com/solutions/dealership-service-management/">Dealership solution overview</a> · <a href="https://nextcoresoft.com/contact/?project=techwheels-service-management">Request a demo</a></p>`
}

export function aiAutomationPricingExtra() {
  return `<h2>Plans (INR, before tax)</h2>
<ul>
<li><strong>Starter</strong> — Setup ${inr(48_000)}, ${inr(7_999)}/month. One production automation with human review.</li>
<li><strong>Growth</strong> — Setup ${inr(72_000)}, ${inr(12_499)}/month. WhatsApp or web chat plus lead workflows.</li>
<li><strong>Enterprise</strong> — Setup ${inr(115_000)}, ${inr(19_499)}/month. Multi-step agents and expanded integrations per contract.</li>
</ul>
<p><a href="https://nextcoresoft.com/services/ai-automation/">AI automation services</a> · <a href="https://nextcoresoft.com/contact/?service=ai-automation">Request a quote</a></p>`
}

export function dealershipSolutionExtra() {
  return `<h2>Product capabilities</h2>
<ul>
<li>Service booking and job tracking for dealerships and service centers</li>
<li>Customer and vehicle records with staff workflows</li>
<li>Admin and employee roles with operational reporting</li>
<li>Customer mobile app on Medium and Premium plans</li>
</ul>
<p><a href="https://nextcoresoft.com/pricing/">Published pricing plans</a> · <a href="https://nextcoresoft.com/portfolio/#techwheels-service-management">Portfolio showcase</a></p>`
}
