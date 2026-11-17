export default function PCBBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <defs>
          <linearGradient id="trace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <g stroke="url(#trace)" strokeWidth="1.2" fill="none">
          <path d="M0 120 L280 120 L320 160 L560 160 L600 200 L900 200 L940 240 L1200 240" />
          <path d="M0 320 L200 320 L240 360 L520 360 L560 320 L820 320 L860 360 L1200 360" />
          <path d="M0 520 L160 520 L200 560 L440 560 L480 520 L760 520 L800 560 L1200 560" />
          <path d="M0 680 L360 680 L400 640 L680 640 L720 680 L1200 680" />
        </g>
        <g fill="#22d3ee">
          <circle cx="280" cy="120" r="3" />
          <circle cx="560" cy="160" r="3" />
          <circle cx="900" cy="200" r="3" />
          <circle cx="520" cy="360" r="3" />
          <circle cx="820" cy="320" r="3" />
          <circle cx="440" cy="560" r="3" />
          <circle cx="760" cy="520" r="3" />
          <circle cx="680" cy="640" r="3" />
        </g>
      </svg>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
