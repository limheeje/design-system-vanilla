import '@/components/common/Checkbox/index.css'
import { createCheckboxElement } from '@/components/common/Checkbox/index.template'
import type { CheckboxOptions, CheckboxInstance } from '@/components/common/Checkbox/index.type'

export const Checkbox = {
  create(options: CheckboxOptions): CheckboxInstance {
    return createCheckboxElement(options)
  },
}

export type {
  CheckboxOptions,
  CheckboxInstance,
  CheckboxState,
} from '@/components/common/Checkbox/index.type'
