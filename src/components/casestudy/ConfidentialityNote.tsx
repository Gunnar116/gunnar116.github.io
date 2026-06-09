import { Container } from '../layout/Container'

type Props = {
  note: string
}

export function ConfidentialityNote({ note }: Props) {
  return (
    <section className="pb-8 sm:pb-10">
      <Container>
        <div className="max-w-3xl rounded-lg border border-border bg-cream-tint px-5 py-4 text-[13px] sm:text-[13.5px] leading-[1.6] text-muted">
          <span className="font-semibold text-ink">Confidentiality.</span> {note}
        </div>
      </Container>
    </section>
  )
}
