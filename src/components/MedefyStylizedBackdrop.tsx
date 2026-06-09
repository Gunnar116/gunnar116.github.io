/**
 * Shared Medefy stylized backdrop — warm off-white base with soft
 * Medefy-inspired blue / pink / sage radial accents. Designed to sit
 * behind the Medefy triptych so the phones float against a designed
 * surface rather than inside another card. Used by both the homepage
 * Selected Work card and the Medefy case study hero.
 */
export function MedefyStylizedBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Warm off-white base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #FBF7F0 0%, #F4EFE5 55%, #ECEEE6 100%)',
        }}
      />
      {/* Medefy blue radial — top right */}
      <div
        className="absolute -top-16 -right-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: '#2E68F0' }}
      />
      {/* Soft pink radial — bottom left */}
      <div
        className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: '#F25C8E' }}
      />
      {/* Sage wash — mid */}
      <div
        className="absolute left-1/3 top-1/3 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: '#7AA890' }}
      />
      {/* Faint contour highlight near top */}
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
    </div>
  )
}
