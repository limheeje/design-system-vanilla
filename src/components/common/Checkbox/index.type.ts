import type { CHECKBOX_STATES } from '@/tokens/constants'

export type CheckboxState = (typeof CHECKBOX_STATES)[number]

export interface CheckboxOptions {
  id?: string
  name?: string
  value?: string
  label?: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  state?: CheckboxState
  message?: string
  onChange?: (checked: boolean, event: Event) => void
}

export interface CheckboxInstance {
  element: HTMLDivElement
  input: HTMLInputElement
  isChecked: () => boolean
  setChecked: (checked: boolean) => void
  setIndeterminate: (indeterminate: boolean) => void
  setDisabled: (disabled: boolean) => void
  setState: (state: CheckboxState) => void
  setMessage: (message: string, state?: CheckboxState) => void
}
