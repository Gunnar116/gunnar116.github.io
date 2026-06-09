import type { MedefyChapter } from '../../data/medefyChapters'
import { MedefyVisual } from './MedefyVisual'

type Props = {
  chapter: MedefyChapter
}

export function MedefyChapterCard({ chapter }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-border-strong hover:shadow-[0_20px_44px_-26px_rgba(20,20,20,0.3)] motion-safe:hover:-translate-y-1">
      <div className="glow-soft">
        <MedefyVisual variant={chapter.visual} image={chapter.image} />
      </div>

      <div className="flex flex-1 flex-col px-6 py-7 sm:px-7 sm:py-8">
        <div className="flex items-center gap-3 text-muted-soft transition-colors duration-300 group-hover:text-ink">
          <span className="text-[12px] font-semibold tabular-nums tracking-[0.04em]">
            {chapter.index}
          </span>
          <span className="h-[1px] w-5 bg-border-strong transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-ink" aria-hidden />
          <span className="eyebrow !text-muted-soft transition-colors duration-300 group-hover:!text-ink">{chapter.label}</span>
        </div>

        <h3 className="mt-4 text-[1.125rem] sm:text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.25] text-ink">
          {chapter.title}
        </h3>

        <p className="mt-3 text-[15px] sm:text-[15.5px] leading-[1.6] text-muted">
          {chapter.caption}
        </p>
      </div>
    </article>
  )
}
