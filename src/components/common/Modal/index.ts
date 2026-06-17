import '@/components/common/Modal/index.css'
import { createModalElement } from '@/components/common/Modal/index.template'
import type { ModalOptions, ModalInstance } from '@/components/common/Modal/index.type'

export const Modal = {
  create(options: ModalOptions): ModalInstance {
    return createModalElement(options)
  },
}

export type {
  ModalOptions,
  ModalInstance,
  ModalType,
} from '@/components/common/Modal/index.type'
