import type { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_STATES } from '@/tokens/constants'

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]
export type ButtonState = (typeof BUTTON_STATES)[number]

export interface ButtonOptions {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  state?: ButtonState
  onClick?: (event: MouseEvent) => void
  prefix?: HTMLElement | string
  suffix?: HTMLElement | string
}
