export function ChatVisual() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="ch-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dy="4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#ch-shadow)" transform="translate(28 22)">
        <rect width="304" height="176" rx="12" fill="#FFFFFF" />

        {/* Sidebar — conversation list */}
        <rect width="104" height="176" rx="12" fill="#F6F8F6" />
        <rect x="104" y="0" width="0.5" height="176" fill="#E0E6E0" />
        <rect x="14" y="16" width="60" height="6" rx="3" fill="#2A3F33" />
        <rect x="14" y="28" width="44" height="4" rx="2" fill="#9CB1A2" />

        <rect x="10" y="46" width="84" height="34" rx="6" fill="#EAF1EA" />
        <circle cx="22" cy="63" r="7" fill="#C5D2C8" />
        <rect x="34" y="55" width="46" height="4" rx="2" fill="#2A3F33" />
        <rect x="34" y="63" width="54" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="34" y="69" width="38" height="3" rx="1.5" fill="#9CB1A2" />

        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(10 ${86 + i * 28})`}>
            <circle cx="12" cy="13" r="7" fill="#E5ECE5" />
            <rect x="24" y="6" width="48" height="4" rx="2" fill="#2A3F33" />
            <rect x="24" y="13" width="58" height="3" rx="1.5" fill="#C5D2C8" />
            <rect x="24" y="19" width="40" height="3" rx="1.5" fill="#C5D2C8" />
          </g>
        ))}

        {/* Main chat panel */}
        <rect x="114" y="14" width="178" height="32" rx="6" fill="#F6F8F6" />
        <circle cx="130" cy="30" r="9" fill="#C5D2C8" />
        <rect x="144" y="22" width="60" height="5" rx="2.5" fill="#2A3F33" />
        <rect x="144" y="31" width="44" height="3" rx="1.5" fill="#5C8A75" />
        <circle cx="278" cy="30" r="4" fill="#5C8A75" />

        <rect x="114" y="58" width="110" height="20" rx="10" fill="#F0F5F0" />
        <rect x="122" y="65" width="68" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="122" y="71" width="46" height="3" rx="1.5" fill="#C5D2C8" />

        <rect x="140" y="84" width="152" height="26" rx="10" fill="#2A3F33" />
        <rect x="148" y="91" width="120" height="3" rx="1.5" fill="#9FB6A8" />
        <rect x="148" y="98" width="98" height="3" rx="1.5" fill="#6A8478" />

        <rect x="114" y="116" width="138" height="20" rx="10" fill="#F0F5F0" />
        <rect x="122" y="123" width="94" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="122" y="129" width="68" height="3" rx="1.5" fill="#C5D2C8" />

        <rect x="114" y="146" width="178" height="20" rx="10" fill="#F6F8F6" stroke="#E0E6E0" />
        <rect x="122" y="154" width="90" height="4" rx="2" fill="#C5D2C8" />
        <circle cx="282" cy="156" r="6" fill="#2A3F33" />
        <path
          d="M279 156l3 3 4-5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}
