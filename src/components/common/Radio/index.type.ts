import type { RADIO_STATES } from '@/tokens/constants'

export type RadioState = (typeof RADIO_STATES)[number]

export interface RadioOptions {
  id?: string
  name: string
  value: string
  label?: string
  checked?: boolean
  disabled?: boolean
  state?: RadioState
  onChange?: (value: string, event: Event) => void
}

export interface RadioInstance {
  element: HTMLDivElement
  input: HTMLInputElement
  isChecked: () => boolean
  setChecked: (checked: boolean) => void
  setDisabled: (disabled: boolean) => void
  setState: (state: RadioState) => void
}
