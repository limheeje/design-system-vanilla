import type { MODAL_TYPES } from '@/tokens/constants'

export type ModalType = (typeof MODAL_TYPES)[number]

export interface ModalOptions {
  type?: ModalType
  title?: string
  description?: string
  content?: HTMLElement
  backdrop?: boolean
  closeOnBackdrop?: boolean
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => boolean | void
  onCancel?: () => boolean | void
  onClose?: () => void
}

export interface ModalInstance {
  element: HTMLDivElement
  open: () => void
  close: () => void
  destroy: () => void
}
