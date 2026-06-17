import '@/components/common/InputField/index.css'
import { createInputFieldElement } from '@/components/common/InputField/index.template'
import type { InputFieldOptions, InputFieldInstance } from '@/components/common/InputField/index.type'

export const InputField = {
  create(options: InputFieldOptions): InputFieldInstance {
    return createInputFieldElement(options)
  },
}

export type {
  InputFieldOptions,
  InputFieldInstance,
  InputType,
  InputState,
  InputFilter,
} from '@/components/common/InputField/index.type'
