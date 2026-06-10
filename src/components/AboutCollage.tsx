/**
 * Overlapping three-photo collage for the homepage About preview. Adds a
 * personal, human note next to the intro copy without overpowering the work.
 *
 * Layout: a relative square box with three matted, slightly rotated portrait
 * photos that overlap. Rotations are subtle and the photos stay inset from the
 * box edges so the rotated corners never overflow the column (no horizontal
 * scroll on mobile). Hover gently lifts and straightens the front photo.
 *
 * Photos live in /public/images and are pre-cropped to 4:5.
 */
type Photo = {
  src: string
  alt: string
  /** Tailwind classes for placement, size, rotation, and stacking. */
  position: string
  /** Rotation applied at rest (straightened on hover). */
  rotate: string
}

const PHOTOS: Photo[] = [
  {
    // Main / front: Gunnar and his Border Collie in the Sedona red rocks.
    src: '/images/gunnar-about-01.jpg',
    alt: 'Gunnar Morgan crouching with his Border Collie on a red-rock overlook in Sedona',
    position: 'left-0 top-[7%] z-20 w-[58%]',
    rotate: '-rotate-2',
  },
  {
    // Upper right: standing with an adventure motorcycle in the desert.
    src: '/images/gunnar-about-02.jpg',
    alt: 'Gunnar Morgan standing beside an adventure motorcycle on a desert trail',
    position: 'right-0 top-0 z-10 w-[47%]',
    rotate: 'rotate-2',
  },
  {
    // Lower right: racing a downhill mountain bike on a wooded trail.
    src: '/images/gunnar-about-03.jpg',
    alt: 'Gunnar Morgan racing a downhill mountain bike on a wooded trail',
    position: 'bottom-0 right-[9%] z-30 w-[42%]',
    rotate: '-rotate-1',
  },
]

export function AboutCollage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px] sm:max-w-[440px] lg:mx-0 lg:ml-auto lg:max-w-[480px]">
      {/* Soft warm wash behind the cluster — a quiet accent detail. */}
      <div
        aria-hidden
        className="absolute inset-x-6 inset-y-10 -z-10 rounded-[28px] bg-accent-soft/60"
      />
      {PHOTOS.map((p) => (
        <figure
          key={p.src}
          className={`group absolute ${p.position} overflow-hidden rounded-2xl border border-border/80 bg-surface p-1.5 shadow-[0_22px_48px_-26px_rgba(20,20,20,0.4)] transition-[transform,box-shadow] duration-300 ease-out ${p.rotate} hover:z-40 motion-safe:hover:rotate-0 motion-safe:hover:-translate-y-1`}
        >
          <img
            src={p.src}
            alt={p.alt}
            width={800}
            height={1000}
            loading="lazy"
            className="block aspect-[4/5] w-full rounded-xl object-cover"
          />
        </figure>
      ))}
    </div>
  )
}
