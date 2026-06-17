import '@/components/common/Radio/index.css'
import '@/components/common/RadioGroup/index.css'
import { createRadioGroupElement } from '@/components/common/RadioGroup/index.template'
import type { RadioGroupOptions, RadioGroupInstance } from '@/components/common/RadioGroup/index.type'

export const RadioGroup = {
  create(options: RadioGroupOptions): RadioGroupInstance {
    return createRadioGroupElement(options)
  },
}

export type {
  RadioGroupOptions,
  RadioGroupInstance,
  RadioGroupItem,
  GroupDirection,
} from '@/components/common/RadioGroup/index.type'
