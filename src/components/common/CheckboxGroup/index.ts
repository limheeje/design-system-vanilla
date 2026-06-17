import '@/components/common/Checkbox/index.css'
import '@/components/common/CheckboxGroup/index.css'
import { createCheckboxGroupElement } from '@/components/common/CheckboxGroup/index.template'
import type { CheckboxGroupOptions, CheckboxGroupInstance } from '@/components/common/CheckboxGroup/index.type'

export const CheckboxGroup = {
  create(options: CheckboxGroupOptions): CheckboxGroupInstance {
    return createCheckboxGroupElement(options)
  },
}

export type {
  CheckboxGroupOptions,
  CheckboxGroupInstance,
  CheckboxGroupItem,
  GroupDirection,
} from '@/components/common/CheckboxGroup/index.type'
