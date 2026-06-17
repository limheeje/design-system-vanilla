import '@/components/common/Button/index.css'
import { createButtonElement } from '@/components/common/Button/index.template'
import type { ButtonOptions } from '@/components/common/Button/index.type'

export const Button = {
  create(options: ButtonOptions): HTMLButtonElement {
    return createButtonElement(options)
  },
}

export type { ButtonOptions, ButtonVariant, ButtonSize } from '@/components/common/Button/index.type'
