import type { TOAST_TYPES, TOAST_POSITIONS } from '@/tokens/constants'

export type ToastType = (typeof TOAST_TYPES)[number]
export type ToastPosition = (typeof TOAST_POSITIONS)[number]

export interface ToastOptions {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
  closable?: boolean
  title?: string
  onClose?: () => void
}

export interface ToastInstance {
  element: HTMLDivElement
  close: () => void
}
