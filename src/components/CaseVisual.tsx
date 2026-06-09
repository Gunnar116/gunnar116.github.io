import type { CaseStudy } from '../data/caseStudies'
import { MedefyStylizedBackdrop } from './MedefyStylizedBackdrop'

type Props = {
  variant: CaseStudy['visual']
  tint: CaseStudy['tint']
  /** Optional real image. When provided, replaces the abstract SVG placeholder. */
  image?: CaseStudy['homeImage']
}

const tintClass: Record<CaseStudy['tint'], string> = {
  medefy: 'bg-tint-medefy',
  truops: 'bg-tint-truops',
  website: 'bg-tint-website',
  fortress: 'bg-tint-fortress',
  kindness: 'bg-tint-kindness',
}

/**
 * Selected Work card visual. Renders a real image if one is provided
 * (via the case study's `homeImage`); otherwise falls back to a polished
 * abstract SVG placeholder. The framed container (tint + ring + rounded)
 * stays consistent across both modes.
 */
export function CaseVisual({ variant, tint, image }: Props) {
  const fit = image?.fit ?? 'cover'
  const stylized = image?.treatment === 'medefy-stylized'

  return (
    <div
      className={`relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl ${
        stylized ? '' : tintClass[tint]
      }`}
    >
      {stylized && <MedefyStylizedBackdrop />}

      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={`relative h-full w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04] ${
            fit === 'contain'
              ? stylized
                ? 'object-contain object-bottom px-4 pt-6 pb-2 sm:px-8 sm:pt-10 sm:pb-3'
                : 'object-contain p-4 sm:p-6'
              : 'object-cover'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
          {variant === 'medefy' && <MedefyVisual />}
          {variant === 'truops-platform' && <PlatformVisual />}
          {variant === 'truops-website' && <WebsiteVisual />}
          {variant === 'fortress' && <FortressVisual />}
          {variant === 'kindness-ai' && <KindnessVisual />}
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.04]"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Medefy — phone with chat / context card                             */
/* ------------------------------------------------------------------ */
function MedefyVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="m-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.18" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background context card — benefits summary */}
      <g filter="url(#m-shadow)">
        <rect x="58" y="58" width="220" height="232" rx="18" fill="#FFFFFF" />
      </g>
      <rect x="78" y="80" width="36" height="6" rx="3" fill="#C5D2C8" />
      <rect x="78" y="96" width="120" height="10" rx="3" fill="#2A3F33" />
      <rect x="78" y="112" width="92" height="6" rx="3" fill="#9CB1A2" />

      {/* member card */}
      <rect x="78" y="134" width="180" height="56" rx="10" fill="#F0F5F0" />
      <circle cx="100" cy="162" r="12" fill="#C8D9CC" />
      <rect x="120" y="152" width="76" height="6" rx="3" fill="#2A3F33" />
      <rect x="120" y="164" width="100" height="5" rx="2.5" fill="#9CB1A2" />
      <rect x="120" y="174" width="60" height="5" rx="2.5" fill="#9CB1A2" />

      {/* benefit rows */}
      <rect x="78" y="206" width="180" height="14" rx="4" fill="#F0F5F0" />
      <rect x="84" y="211" width="42" height="4" rx="2" fill="#5C8A75" />
      <rect x="220" y="211" width="32" height="4" rx="2" fill="#9CB1A2" />

      <rect x="78" y="226" width="180" height="14" rx="4" fill="#F0F5F0" />
      <rect x="84" y="231" width="56" height="4" rx="2" fill="#5C8A75" />
      <rect x="220" y="231" width="32" height="4" rx="2" fill="#9CB1A2" />

      <rect x="78" y="246" width="180" height="14" rx="4" fill="#F0F5F0" />
      <rect x="84" y="251" width="48" height="4" rx="2" fill="#5C8A75" />
      <rect x="220" y="251" width="32" height="4" rx="2" fill="#9CB1A2" />

      {/* Foreground phone — chat */}
      <g filter="url(#m-shadow)" transform="translate(252 32)">
        <rect width="170" height="296" rx="26" fill="#FFFFFF" />
        <rect x="68" y="14" width="34" height="6" rx="3" fill="#EAEEE9" />
        {/* phone header */}
        <rect x="14" y="38" width="142" height="42" rx="10" fill="#F4F8F3" />
        <circle cx="34" cy="59" r="11" fill="#C8D9CC" />
        <rect x="52" y="50" width="64" height="6" rx="3" fill="#2A3F33" />
        <rect x="52" y="62" width="44" height="4" rx="2" fill="#5C8A75" />
        <circle cx="138" cy="59" r="4" fill="#5C8A75" />

        {/* incoming bubble */}
        <rect x="14" y="92" width="116" height="22" rx="11" fill="#F0F5F0" />
        <rect x="22" y="100" width="76" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="22" y="106" width="60" height="3" rx="1.5" fill="#C5D2C8" />

        <rect x="14" y="120" width="92" height="16" rx="8" fill="#F0F5F0" />
        <rect x="22" y="126" width="60" height="3" rx="1.5" fill="#9CB1A2" />

        {/* outgoing bubble */}
        <rect x="46" y="146" width="110" height="22" rx="11" fill="#2A3F33" />
        <rect x="54" y="154" width="78" height="3" rx="1.5" fill="#9FB6A8" />
        <rect x="54" y="160" width="56" height="3" rx="1.5" fill="#6A8478" />

        {/* incoming bubble 2 */}
        <rect x="14" y="174" width="124" height="36" rx="11" fill="#F0F5F0" />
        <rect x="22" y="182" width="100" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="22" y="188" width="88" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="22" y="194" width="68" height="3" rx="1.5" fill="#C5D2C8" />
        <rect x="22" y="200" width="50" height="3" rx="1.5" fill="#C5D2C8" />

        {/* quick reply chips */}
        <rect x="14" y="220" width="56" height="16" rx="8" fill="#FFFFFF" stroke="#D9E2DC" />
        <rect x="22" y="226" width="40" height="3" rx="1.5" fill="#5C8A75" />

        <rect x="76" y="220" width="68" height="16" rx="8" fill="#FFFFFF" stroke="#D9E2DC" />
        <rect x="84" y="226" width="52" height="3" rx="1.5" fill="#5C8A75" />

        {/* input bar */}
        <rect x="14" y="252" width="142" height="22" rx="11" fill="#F4F8F3" stroke="#E0E8E2" />
        <rect x="22" y="261" width="80" height="4" rx="2" fill="#C5D2C8" />
        <circle cx="146" cy="263" r="7" fill="#2A3F33" />
        <path d="M143 263l3 3 4-5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* home indicator */}
        <rect x="60" y="282" width="50" height="3" rx="1.5" fill="#E5EBE6" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* TruOps Platform — enterprise dashboard                              */
/* ------------------------------------------------------------------ */
function PlatformVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="p-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#p-shadow)" transform="translate(28 32)">
        {/* surface */}
        <rect width="424" height="276" rx="14" fill="#FFFFFF" />

        {/* topbar */}
        <rect width="424" height="36" rx="14" fill="#F7F8FB" />
        <rect y="22" width="424" height="14" fill="#F7F8FB" />
        <rect x="16" y="14" width="42" height="8" rx="3" fill="#1F2A44" />
        <rect x="74" y="14" width="36" height="8" rx="3" fill="#D0D7E2" />
        <circle cx="396" cy="18" r="9" fill="#EEF1F7" />
        <rect x="340" y="13" width="42" height="10" rx="5" fill="#EEF1F7" />
        <line x1="0" y1="36" x2="424" y2="36" stroke="#E6E9F0" />

        {/* sidebar */}
        <rect y="36" width="86" height="240" fill="#F7F8FB" />
        <line x1="86" y1="36" x2="86" y2="276" stroke="#E6E9F0" />
        <rect x="14" y="50" width="36" height="4" rx="2" fill="#A6B0C2" />
        <rect x="14" y="64" width="60" height="8" rx="3" fill="#1F2A44" />
        <rect x="14" y="78" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="92" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="106" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="120" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="144" width="36" height="4" rx="2" fill="#A6B0C2" />
        <rect x="14" y="158" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="172" width="60" height="8" rx="3" fill="#EAEDF3" />
        <rect x="14" y="186" width="60" height="8" rx="3" fill="#EAEDF3" />

        {/* main */}
        <rect x="98" y="50" width="100" height="6" rx="3" fill="#1F2A44" />
        <rect x="98" y="62" width="160" height="4" rx="2" fill="#C9D0DC" />

        {/* KPI cards */}
        <rect x="98" y="80" width="96" height="56" rx="8" fill="#F7F8FB" />
        <rect x="106" y="90" width="34" height="4" rx="2" fill="#A6B0C2" />
        <rect x="106" y="100" width="56" height="14" rx="3" fill="#1F2A44" />
        <rect x="106" y="120" width="70" height="3" rx="1.5" fill="#C9D0DC" />
        <rect x="106" y="126" width="46" height="3" rx="1.5" fill="#C9D0DC" />

        <rect x="206" y="80" width="96" height="56" rx="8" fill="#F7F8FB" />
        <rect x="214" y="90" width="34" height="4" rx="2" fill="#A6B0C2" />
        <rect x="214" y="100" width="56" height="14" rx="3" fill="#1F2A44" />
        <rect x="214" y="120" width="70" height="3" rx="1.5" fill="#C9D0DC" />
        <rect x="214" y="126" width="46" height="3" rx="1.5" fill="#C9D0DC" />

        <rect x="314" y="80" width="96" height="56" rx="8" fill="#F7F8FB" />
        <rect x="322" y="90" width="34" height="4" rx="2" fill="#A6B0C2" />
        {/* mini ring */}
        <circle cx="334" cy="114" r="11" stroke="#D6DCE6" strokeWidth="3" fill="none" />
        <path d="M334 103 A11 11 0 0 1 343 119" stroke="#4A6EB1" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="354" y="106" width="46" height="3" rx="1.5" fill="#C9D0DC" />
        <rect x="354" y="113" width="38" height="3" rx="1.5" fill="#C9D0DC" />
        <rect x="354" y="120" width="42" height="3" rx="1.5" fill="#C9D0DC" />

        {/* chart card */}
        <rect x="98" y="148" width="206" height="116" rx="8" fill="#F7F8FB" />
        <rect x="108" y="158" width="60" height="5" rx="2.5" fill="#1F2A44" />
        <rect x="108" y="168" width="44" height="3" rx="1.5" fill="#A6B0C2" />
        {/* axis */}
        <line x1="108" y1="248" x2="294" y2="248" stroke="#E0E5EE" />
        {/* area fill */}
        <path
          d="M108 238 L 128 224 L 148 230 L 168 212 L 188 218 L 208 200 L 228 208 L 248 188 L 268 196 L 288 178 L 294 174 L 294 248 L 108 248 Z"
          fill="#4A6EB1"
          fillOpacity="0.12"
        />
        {/* line */}
        <polyline
          points="108,238 128,224 148,230 168,212 188,218 208,200 228,208 248,188 268,196 288,178"
          stroke="#4A6EB1"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="248" cy="188" r="3" fill="#4A6EB1" />

        {/* right list */}
        <rect x="314" y="148" width="96" height="116" rx="8" fill="#F7F8FB" />
        <rect x="322" y="158" width="50" height="5" rx="2.5" fill="#1F2A44" />
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(322 ${176 + i * 16})`}>
              <circle cx="3" cy="4" r="2.5" fill={i === 0 ? '#4A6EB1' : '#C9D0DC'} />
              <rect x="12" y="2" width="44" height="3" rx="1.5" fill="#1F2A44" />
              <rect x="12" y="7" width="30" height="2.5" rx="1.25" fill="#C9D0DC" />
              <rect x="64" y="3" width="16" height="3" rx="1.5" fill="#A6B0C2" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* TruOps Website — marketing page                                     */
/* ------------------------------------------------------------------ */
function WebsiteVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="w-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#w-shadow)" transform="translate(28 32)">
        <rect width="424" height="276" rx="14" fill="#FFFFFF" />

        {/* nav */}
        <rect x="24" y="24" width="40" height="8" rx="3" fill="#2A2417" />
        <rect x="248" y="26" width="22" height="4" rx="2" fill="#A89E89" />
        <rect x="280" y="26" width="22" height="4" rx="2" fill="#A89E89" />
        <rect x="312" y="26" width="22" height="4" rx="2" fill="#A89E89" />
        <rect x="352" y="20" width="48" height="16" rx="8" fill="#2A2417" />
        <rect x="360" y="26" width="32" height="4" rx="2" fill="#F2EDE5" />
        <line x1="0" y1="56" x2="424" y2="56" stroke="#EDE6D8" />

        {/* hero text column */}
        <rect x="24" y="80" width="200" height="10" rx="3" fill="#2A2417" />
        <rect x="24" y="98" width="180" height="10" rx="3" fill="#2A2417" />
        <rect x="24" y="116" width="130" height="10" rx="3" fill="#2A2417" />

        <rect x="24" y="140" width="220" height="4" rx="2" fill="#A89E89" />
        <rect x="24" y="150" width="200" height="4" rx="2" fill="#A89E89" />
        <rect x="24" y="160" width="160" height="4" rx="2" fill="#A89E89" />

        <rect x="24" y="180" width="76" height="20" rx="10" fill="#2A2417" />
        <rect x="32" y="187" width="60" height="6" rx="3" fill="#F2EDE5" />
        <rect x="110" y="180" width="76" height="20" rx="10" fill="#FFFFFF" stroke="#D9D1BC" />
        <rect x="118" y="187" width="60" height="6" rx="3" fill="#2A2417" />

        {/* hero visual column */}
        <rect x="252" y="80" width="148" height="124" rx="10" fill="#F6F1E6" />
        <rect x="264" y="92" width="60" height="6" rx="3" fill="#A89E89" />
        <rect x="264" y="104" width="100" height="4" rx="2" fill="#C9BFA4" />
        <rect x="264" y="112" width="90" height="4" rx="2" fill="#C9BFA4" />
        {/* card sub-content */}
        <rect x="264" y="128" width="124" height="62" rx="8" fill="#FFFFFF" stroke="#EDE6D8" />
        <circle cx="280" cy="148" r="8" fill="#EDE6D8" />
        <rect x="294" y="142" width="60" height="5" rx="2.5" fill="#2A2417" />
        <rect x="294" y="151" width="80" height="3" rx="1.5" fill="#C9BFA4" />
        <rect x="272" y="166" width="108" height="3" rx="1.5" fill="#C9BFA4" />
        <rect x="272" y="174" width="100" height="3" rx="1.5" fill="#C9BFA4" />

        {/* trust / proof row */}
        <rect x="24" y="220" width="80" height="36" rx="8" fill="#FAF6EC" />
        <rect x="36" y="232" width="32" height="4" rx="2" fill="#A89E89" />
        <rect x="36" y="241" width="48" height="6" rx="3" fill="#2A2417" />

        <rect x="116" y="220" width="80" height="36" rx="8" fill="#FAF6EC" />
        <rect x="128" y="232" width="32" height="4" rx="2" fill="#A89E89" />
        <rect x="128" y="241" width="48" height="6" rx="3" fill="#2A2417" />

        <rect x="208" y="220" width="80" height="36" rx="8" fill="#FAF6EC" />
        <rect x="220" y="232" width="32" height="4" rx="2" fill="#A89E89" />
        <rect x="220" y="241" width="48" height="6" rx="3" fill="#2A2417" />

        <rect x="300" y="220" width="100" height="36" rx="8" fill="#FAF6EC" />
        <rect x="312" y="232" width="32" height="4" rx="2" fill="#A89E89" />
        <rect x="312" y="241" width="68" height="6" rx="3" fill="#2A2417" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Fortress — risk visualization map                                   */
/* ------------------------------------------------------------------ */
function FortressVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="f-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DCDCE4" strokeWidth="0.6" />
        </pattern>
      </defs>

      <g filter="url(#f-shadow)" transform="translate(28 32)">
        <rect width="424" height="276" rx="14" fill="#FFFFFF" />

        {/* topbar */}
        <rect width="424" height="32" rx="14" fill="#F4F4F8" />
        <rect y="18" width="424" height="14" fill="#F4F4F8" />
        <rect x="14" y="12" width="44" height="8" rx="3" fill="#2A2740" />
        <rect x="64" y="12" width="28" height="8" rx="3" fill="#C7C5D8" />
        <rect x="324" y="10" width="44" height="12" rx="6" fill="#EAE9F1" />
        <rect x="374" y="10" width="36" height="12" rx="6" fill="#EAE9F1" />
        <line x1="0" y1="32" x2="424" y2="32" stroke="#E4E3ED" />

        {/* map area */}
        <rect x="0" y="32" width="280" height="244" fill="#FAFAFC" />
        <rect x="0" y="32" width="280" height="244" fill="url(#grid)" />

        {/* connecting edges */}
        <g stroke="#9892B6" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="60" y1="100" x2="130" y2="78" />
          <line x1="60" y1="100" x2="106" y2="148" />
          <line x1="130" y1="78" x2="208" y2="92" />
          <line x1="130" y1="78" x2="164" y2="128" />
          <line x1="106" y1="148" x2="164" y2="128" />
          <line x1="164" y1="128" x2="236" y2="116" />
          <line x1="208" y1="92" x2="236" y2="116" />
          <line x1="236" y1="116" x2="248" y2="200" />
          <line x1="164" y1="128" x2="196" y2="216" />
          <line x1="106" y1="148" x2="76" y2="218" />
        </g>

        {/* nodes */}
        <g>
          {/* low risk */}
          <circle cx="60" cy="100" r="11" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.6" />
          <circle cx="60" cy="100" r="4" fill="#5B4E91" />
          {/* high risk — alert */}
          <circle cx="130" cy="78" r="14" fill="#2A2740" />
          <circle cx="130" cy="78" r="4" fill="#FCE3CE" />
          <circle cx="130" cy="78" r="20" fill="none" stroke="#5B4E91" strokeWidth="0.8" strokeDasharray="2 2" />
          {/* mid */}
          <circle cx="208" cy="92" r="10" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.6" />
          <circle cx="208" cy="92" r="3.5" fill="#2A2740" />
          {/* low */}
          <circle cx="106" cy="148" r="9" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.6" />
          <circle cx="106" cy="148" r="3" fill="#2A2740" />
          {/* center selected */}
          <circle cx="164" cy="128" r="12" fill="#FFFFFF" stroke="#5B4E91" strokeWidth="2" />
          <circle cx="164" cy="128" r="4" fill="#5B4E91" />
          {/* right */}
          <circle cx="236" cy="116" r="10" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.6" />
          <circle cx="236" cy="116" r="3.5" fill="#2A2740" />
          {/* leaves */}
          <circle cx="76" cy="218" r="7" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.4" />
          <circle cx="196" cy="216" r="8" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.4" />
          <circle cx="248" cy="200" r="7" fill="#FFFFFF" stroke="#2A2740" strokeWidth="1.4" />
        </g>

        {/* zoom controls */}
        <rect x="248" y="46" width="20" height="36" rx="4" fill="#FFFFFF" stroke="#E4E3ED" />
        <line x1="252" y1="64" x2="264" y2="64" stroke="#9892B6" strokeWidth="1.2" />
        <line x1="252" y1="64" x2="264" y2="64" stroke="#9892B6" strokeWidth="1.2" />
        <line x1="258" y1="56" x2="258" y2="60" stroke="#9892B6" strokeWidth="1.2" />
        <line x1="258" y1="68" x2="258" y2="72" stroke="#9892B6" strokeWidth="1.2" />

        {/* inspector panel */}
        <line x1="280" y1="32" x2="280" y2="276" stroke="#E4E3ED" />
        <rect x="294" y="48" width="56" height="4" rx="2" fill="#9892B6" />
        <rect x="294" y="60" width="100" height="8" rx="3" fill="#2A2740" />
        <rect x="294" y="76" width="76" height="4" rx="2" fill="#C7C5D8" />

        {/* metric tile */}
        <rect x="294" y="96" width="116" height="44" rx="6" fill="#F4F4F8" />
        <rect x="302" y="106" width="40" height="3" rx="1.5" fill="#9892B6" />
        <rect x="302" y="116" width="60" height="10" rx="3" fill="#2A2740" />
        <rect x="302" y="130" width="46" height="3" rx="1.5" fill="#C7C5D8" />

        {/* status badges */}
        <rect x="294" y="152" width="58" height="14" rx="7" fill="#EFEAF6" />
        <circle cx="302" cy="159" r="3" fill="#5B4E91" />
        <rect x="310" y="157" width="34" height="4" rx="2" fill="#5B4E91" />

        <rect x="356" y="152" width="54" height="14" rx="7" fill="#F4F4F8" />
        <rect x="362" y="157" width="42" height="4" rx="2" fill="#9892B6" />

        {/* list of connections */}
        <rect x="294" y="178" width="100" height="4" rx="2" fill="#9892B6" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(294 ${192 + i * 18})`}>
            <circle cx="3" cy="6" r="3" fill={i === 0 ? '#5B4E91' : '#C7C5D8'} />
            <rect x="12" y="2" width="60" height="3" rx="1.5" fill="#2A2740" />
            <rect x="12" y="8" width="36" height="2.5" rx="1.25" fill="#C7C5D8" />
            <rect x="92" y="4" width="22" height="3" rx="1.5" fill="#9892B6" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Kindness.ai — AI-assisted inbox with sidebar + search              */
/* ------------------------------------------------------------------ */
function KindnessVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="k-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#k-shadow)" transform="translate(28 32)">
        <rect width="424" height="276" rx="14" fill="#FFFFFF" />

        {/* Topbar */}
        <rect width="424" height="40" rx="14" fill="#F7F5FA" />
        <rect y="26" width="424" height="14" fill="#F7F5FA" />
        <line x1="0" y1="40" x2="424" y2="40" stroke="#E8E6F0" />
        {/* Brand */}
        <rect x="14" y="16" width="40" height="8" rx="3" fill="#2D2640" />
        {/* Search field */}
        <rect x="120" y="11" width="208" height="18" rx="9" fill="#FFFFFF" stroke="#E8E6F0" />
        <circle cx="132" cy="20" r="4" fill="none" stroke="#9892B0" strokeWidth="1.3" />
        <rect x="142" y="18" width="62" height="3" rx="1.5" fill="#C0BBD0" />
        {/* AI chip */}
        <rect x="334" y="11" width="42" height="18" rx="9" fill="#EFEAF6" />
        <circle cx="343" cy="20" r="2" fill="#6E5E8A" />
        <rect x="349" y="18" width="22" height="3" rx="1.5" fill="#6E5E8A" />
        {/* Avatar */}
        <circle cx="402" cy="20" r="9" fill="#E5E1EC" />

        {/* Sidebar */}
        <rect y="40" width="100" height="236" fill="#F9F7FB" />
        <line x1="100" y1="40" x2="100" y2="276" stroke="#E8E6F0" />
        <rect x="14" y="54" width="44" height="4" rx="2" fill="#9892B0" />
        <rect x="10" y="68" width="80" height="22" rx="6" fill="#EFEAF6" />
        <rect x="20" y="78" width="44" height="4" rx="2" fill="#2D2640" />
        <rect x="74" y="76" width="8" height="8" rx="4" fill="#6E5E8A" />
        <rect x="10" y="94" width="80" height="22" rx="6" />
        <rect x="20" y="104" width="38" height="4" rx="2" fill="#5C5570" />
        <rect x="10" y="118" width="80" height="22" rx="6" />
        <rect x="20" y="128" width="48" height="4" rx="2" fill="#5C5570" />

        <rect x="14" y="158" width="44" height="4" rx="2" fill="#9892B0" />
        {[
          { c: '#7A8B5F', w: 46 },
          { c: '#8A6E5C', w: 38 },
          { c: '#5C7A8B', w: 52 },
          { c: '#8A5C7A', w: 44 },
        ].map((item, i) => (
          <g key={i} transform={`translate(14 ${174 + i * 18})`}>
            <circle cx="4" cy="6" r="3" fill={item.c} />
            <rect x="14" y="3" width={item.w} height="4" rx="2" fill="#2D2640" />
          </g>
        ))}

        {/* Main panel header */}
        <rect x="112" y="54" width="60" height="4" rx="2" fill="#9892B0" />
        <rect x="112" y="64" width="120" height="8" rx="3" fill="#2D2640" />
        <line x1="100" y1="84" x2="424" y2="84" stroke="#E8E6F0" />

        {/* Message rows */}
        {/* Row 1 — selected */}
        <g transform="translate(100 88)">
          <rect width="324" height="36" fill="#EFEAF6" />
          <line x1="0" y1="36" x2="324" y2="36" stroke="#E8E6F0" />
          <circle cx="22" cy="18" r="9" fill="#C0BBD0" />
          <rect x="40" y="10" width="78" height="4" rx="2" fill="#2D2640" />
          <rect x="40" y="18" width="160" height="3" rx="1.5" fill="#5C5570" />
          <rect x="40" y="24" width="106" height="3" rx="1.5" fill="#9892B0" />
          <rect x="232" y="11" width="42" height="12" rx="6" fill="#FFFFFF" stroke="#E0D8EC" />
          <circle cx="240" cy="17" r="2" fill="#6E5E8A" />
          <rect x="246" y="15" width="22" height="4" rx="2" fill="#6E5E8A" />
          <rect x="290" y="14" width="22" height="3" rx="1.5" fill="#9892B0" />
        </g>

        {/* Row 2 */}
        <g transform="translate(100 124)">
          <line x1="0" y1="36" x2="324" y2="36" stroke="#E8E6F0" />
          <circle cx="22" cy="18" r="9" fill="#E5E1EC" />
          <rect x="40" y="10" width="58" height="4" rx="2" fill="#2D2640" />
          <rect x="40" y="18" width="140" height="3" rx="1.5" fill="#5C5570" />
          <rect x="40" y="24" width="120" height="3" rx="1.5" fill="#9892B0" />
          <rect x="232" y="11" width="36" height="12" rx="6" fill="#F4EFE9" />
          <circle cx="240" cy="17" r="2" fill="#8A6E5C" />
          <rect x="246" y="15" width="16" height="4" rx="2" fill="#8A6E5C" />
          <rect x="290" y="14" width="22" height="3" rx="1.5" fill="#9892B0" />
        </g>

        {/* Row 3 */}
        <g transform="translate(100 160)">
          <line x1="0" y1="36" x2="324" y2="36" stroke="#E8E6F0" />
          <circle cx="22" cy="18" r="9" fill="#E5E1EC" />
          <rect x="40" y="10" width="68" height="4" rx="2" fill="#2D2640" />
          <rect x="40" y="18" width="150" height="3" rx="1.5" fill="#5C5570" />
          <rect x="40" y="24" width="84" height="3" rx="1.5" fill="#9892B0" />
          <rect x="290" y="14" width="22" height="3" rx="1.5" fill="#9892B0" />
        </g>

        {/* Row 4 */}
        <g transform="translate(100 196)">
          <line x1="0" y1="36" x2="324" y2="36" stroke="#E8E6F0" />
          <circle cx="22" cy="18" r="9" fill="#E5E1EC" />
          <rect x="40" y="10" width="54" height="4" rx="2" fill="#2D2640" />
          <rect x="40" y="18" width="130" height="3" rx="1.5" fill="#5C5570" />
          <rect x="40" y="24" width="108" height="3" rx="1.5" fill="#9892B0" />
          <rect x="232" y="11" width="40" height="12" rx="6" fill="#EFF1EC" />
          <circle cx="240" cy="17" r="2" fill="#7A8B5F" />
          <rect x="246" y="15" width="20" height="4" rx="2" fill="#7A8B5F" />
          <rect x="290" y="14" width="22" height="3" rx="1.5" fill="#9892B0" />
        </g>

        {/* Row 5 */}
        <g transform="translate(100 232)">
          <circle cx="22" cy="18" r="9" fill="#E5E1EC" />
          <rect x="40" y="10" width="62" height="4" rx="2" fill="#2D2640" />
          <rect x="40" y="18" width="146" height="3" rx="1.5" fill="#5C5570" />
          <rect x="40" y="24" width="92" height="3" rx="1.5" fill="#9892B0" />
          <rect x="290" y="14" width="22" height="3" rx="1.5" fill="#9892B0" />
        </g>
      </g>
    </svg>
  )
}
