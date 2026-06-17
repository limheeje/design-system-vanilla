import type { FORM_GROUP_DIRECTIONS } from '@/tokens/constants'
import type { CheckboxState } from '@/components/common/Checkbox/index.type'

export type { CheckboxState }
export type GroupDirection = (typeof FORM_GROUP_DIRECTIONS)[number]

export interface CheckboxGroupItem {
  value: string
  label: string
  disabled?: boolean
  checked?: boolean
}

export interface CheckboxGroupOptions {
  name?: string
  legend?: string
  items: CheckboxGroupItem[]
  values?: string[]
  required?: boolean
  min?: number
  max?: number
  direction?: GroupDirection
  message?: string
  state?: CheckboxState
  onChange?: (values: string[], event: Event) => void
}

export interface CheckboxGroupInstance {
  element: HTMLFieldSetElement
  getValues: () => string[]
  setValues: (values: string[]) => void
  setState: (state: CheckboxState) => void
  setMessage: (message: string, state?: CheckboxState) => void
  validate: () => boolean
}
