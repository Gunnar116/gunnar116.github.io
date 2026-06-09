import type { ReactNode, HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  size?: 'default' | 'narrow' | 'wide'
}

const sizeMap = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
} as const

export function Container({
  children,
  size = 'default',
  className = '',
  ...rest
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${sizeMap[size]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
