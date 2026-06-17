import type { INPUT_TYPES, INPUT_STATES, INPUT_FILTERS } from '@/tokens/constants'

export type InputType = (typeof INPUT_TYPES)[number]
export type InputState = (typeof INPUT_STATES)[number]
export type InputFilter = (typeof INPUT_FILTERS)[number]

export interface InputFieldOptions {
  id?: string
  name?: string
  type?: InputType
  label?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  readonly?: boolean
  state?: InputState
  message?: string
  prefix?: HTMLElement | string
  suffix?: HTMLElement | string
  filter?: InputFilter
  customFilter?: (value: string) => string
  maxLength?: number
  onChange?: (value: string, event: Event) => void
  onInput?: (value: string, event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface InputFieldInstance {
  element: HTMLDivElement
  input: HTMLInputElement
  getValue: () => string
  setValue: (value: string) => void
  setState: (state: InputState) => void
  setMessage: (message: string, state?: InputState) => void
  setDisabled: (disabled: boolean) => void
}
