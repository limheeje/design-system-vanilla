import '@/components/common/Toast/index.css'
import { createToastElement } from '@/components/common/Toast/index.template'
import type { ToastOptions, ToastInstance } from '@/components/common/Toast/index.type'

export const Toast = {
  show(options: ToastOptions): ToastInstance {
    return createToastElement(options)
  },
}

export type {
  ToastOptions,
  ToastInstance,
  ToastType,
  ToastPosition,
} from '@/components/common/Toast/index.type'
