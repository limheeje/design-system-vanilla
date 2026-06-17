import type { FORM_GROUP_DIRECTIONS } from '@/tokens/constants'
import type { RadioState } from '@/components/common/Radio/index.type'

export type { RadioState }
export type GroupDirection = (typeof FORM_GROUP_DIRECTIONS)[number]

export interface RadioGroupItem {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupOptions {
  name?: string
  legend?: string
  items: RadioGroupItem[]
  value?: string
  required?: boolean
  direction?: GroupDirection
  message?: string
  state?: RadioState
  onChange?: (value: string, event: Event) => void
}

export interface RadioGroupInstance {
  element: HTMLFieldSetElement
  getValue: () => string | null
  setValue: (value: string) => void
  setState: (state: RadioState) => void
  setMessage: (message: string, state?: RadioState) => void
  validate: () => boolean
}
