export function AccessibilityVisual() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="ac-shadow" x="-10%" y="-10%" width="120%" height="120%">
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

      {/* Before card */}
      <g filter="url(#ac-shadow)" transform="translate(24 28)">
        <rect width="148" height="166" rx="10" fill="#FFFFFF" />

        {/* Eyebrow label */}
        <text
          x="14"
          y="22"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.4"
          fill="#9CB1A2"
        >
          BEFORE
        </text>

        {/* Low-contrast text preview */}
        <rect x="14" y="36" width="120" height="56" rx="6" fill="#EDEEEE" />
        <rect x="22" y="48" width="56" height="6" rx="2" fill="#B8B8B8" />
        <rect x="22" y="62" width="80" height="4" rx="2" fill="#C4C4C4" />
        <rect x="22" y="72" width="60" height="4" rx="2" fill="#C4C4C4" />
        <rect x="22" y="82" width="48" height="4" rx="2" fill="#C4C4C4" />

        {/* Status chip — issue */}
        <rect x="14" y="102" width="116" height="20" rx="10" fill="#F4E2DD" />
        <circle cx="24" cy="112" r="3.5" fill="#C04A3C" />
        <text
          x="34"
          y="116"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
          fontWeight="600"
          fill="#8E2E22"
        >
          Contrast issue
        </text>

        {/* Sample body */}
        <rect x="14" y="128" width="120" height="3" rx="1.5" fill="#D7DCD8" />
        <rect x="14" y="136" width="96" height="3" rx="1.5" fill="#D7DCD8" />
        <rect x="14" y="144" width="108" height="3" rx="1.5" fill="#D7DCD8" />
        <rect x="14" y="152" width="76" height="3" rx="1.5" fill="#D7DCD8" />
      </g>

      {/* After card */}
      <g filter="url(#ac-shadow)" transform="translate(188 28)">
        <rect width="148" height="166" rx="10" fill="#FFFFFF" />

        <text
          x="14"
          y="22"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.4"
          fill="#5C8A75"
        >
          AFTER
        </text>

        {/* High-contrast text preview */}
        <rect x="14" y="36" width="120" height="56" rx="6" fill="#FFFFFF" stroke="#D9E0DB" />
        <rect x="22" y="48" width="56" height="6" rx="2" fill="#1F1F1F" />
        <rect x="22" y="62" width="80" height="4" rx="2" fill="#3A3A3A" />
        <rect x="22" y="72" width="60" height="4" rx="2" fill="#3A3A3A" />
        <rect x="22" y="82" width="48" height="4" rx="2" fill="#3A3A3A" />

        {/* Status chip — improved */}
        <rect x="14" y="102" width="130" height="20" rx="10" fill="#E1ECDF" />
        <circle cx="24" cy="112" r="3.5" fill="#3F7E5A" />
        <text
          x="34"
          y="116"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
          fontWeight="600"
          fill="#2A5A40"
        >
          Improved contrast
        </text>

        <rect x="14" y="128" width="120" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="14" y="136" width="96" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="14" y="144" width="108" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="14" y="152" width="76" height="3" rx="1.5" fill="#9CB1A2" />
      </g>

      {/* Arrow between */}
      <g transform="translate(170 102)">
        <circle cx="10" cy="10" r="11" fill="#FFFFFF" stroke="#D9E0DB" />
        <path
          d="M6 10h8m0 0l-2-2m2 2l-2 2"
          stroke="#2A3F33"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}
