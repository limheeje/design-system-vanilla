import '@/components/common/Radio/index.css'
import { createRadioElement } from '@/components/common/Radio/index.template'
import type { RadioOptions, RadioInstance } from '@/components/common/Radio/index.type'

export const Radio = {
  create(options: RadioOptions): RadioInstance {
    return createRadioElement(options)
  },
}

export type {
  RadioOptions,
  RadioInstance,
  RadioState,
} from '@/components/common/Radio/index.type'
