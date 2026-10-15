/**
 * Lightweight stand-in for the 3D core, rendered with CSS only.
 * Shown on phones, tablets, reduced-motion settings, and browsers
 * without WebGL — and as the placeholder while the 3D bundle loads.
 */
export function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative aspect-square w-[min(78%,420px)]">
        <div className="absolute inset-[2%] animate-pulse-soft rounded-full border border-violet-300/30" />
        <div className="absolute inset-[12%] rounded-full border border-blue-400/40" />
        <div className="absolute inset-[23%] rounded-full border border-cyan-300/50" />
        <div className="absolute inset-[36%] rounded-full bg-radial from-cyan-200/80 via-sky-400/30 to-transparent blur-[2px]" />
        <div className="absolute inset-[46%] rounded-full bg-cyan-100 shadow-[0_0_60px_12px] shadow-cyan-400/60" />
        {/* A few static nodes so the fallback still reads as a network */}
        {[
          "left-[8%] top-[30%]",
          "right-[6%] top-[42%]",
          "left-[20%] bottom-[12%]",
          "right-[18%] bottom-[16%]",
          "left-[46%] top-[2%]",
        ].map((pos) => (
          <span key={pos} className={`absolute h-2 w-2 rounded-full bg-cyan-300 ${pos}`} />
        ))}
      </div>
    </div>
  )
}
