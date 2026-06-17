import './button.css'
import { createButtonElement } from './button.template'
import type { ButtonOptions } from './button.types'

export const Button = {
  create(options: ButtonOptions): HTMLButtonElement {
    return createButtonElement(options)
  },
}

export type { ButtonOptions, ButtonVariant, ButtonSize } from './button.types'
