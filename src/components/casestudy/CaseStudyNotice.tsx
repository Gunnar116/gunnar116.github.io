type Props = {
  text: string
  /** Bold lead-in label. Defaults to "About this case study." */
  label?: string
}

/**
 * Quiet, optional notice card shown high in a case study header (right after
 * the subtitle, above the fold). Intentionally understated — a subtle bordered
 * card, not a warning banner. Renders only the card; it is placed inside the
 * header's existing Container. Use for context the reader should have up front,
 * e.g. a stealth-stage / abstracted-work note.
 */
export function CaseStudyNotice({ text, label = 'About this case study.' }: Props) {
  return (
    <div className="mt-6 max-w-2xl rounded-md border border-border bg-cream-tint px-4 py-2.5 text-[12px] sm:text-[12.5px] leading-[1.5] text-muted">
      <span className="font-semibold text-ink">{label}</span> {text}
    </div>
  )
}
