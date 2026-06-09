import type { ReactNode, HTMLAttributes } from 'react'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: 'cream' | 'surface' | 'charcoal'
  spacing?: 'default' | 'snug' | 'loose'
}

const toneMap = {
  cream: 'bg-cream text-ink',
  surface: 'bg-surface text-ink',
  charcoal: 'bg-charcoal text-cream',
} as const

const spacingMap = {
  snug: 'py-16 sm:py-20 lg:py-24',
  default: 'py-20 sm:py-28 lg:py-40',
  loose: 'py-28 sm:py-36 lg:py-48',
} as const

export function Section({
  children,
  tone = 'cream',
  spacing = 'default',
  className = '',
  ...rest
}: SectionProps) {
  return (
    <section
      className={`relative w-full ${toneMap[tone]} ${spacingMap[spacing]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}
