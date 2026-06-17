// ── Button ────────────────────────────────────────────────────────────────────

export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger', 'ghost'] as const
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const
export const BUTTON_STATES = ['default', 'loading', 'readonly'] as const

export const BUTTON_DEFAULTS = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  state: 'default',
} as const

export const BUTTON_CLASS = {
  base: 'btn',
  prefix: 'btn--',
} as const

// ── InputField ────────────────────────────────────────────────────────────────

export const INPUT_TYPES = ['text', 'email', 'number', 'password', 'tel', 'url'] as const
export const INPUT_STATES = ['default', 'error', 'warning', 'success'] as const
export const INPUT_FILTERS = ['korean', 'english', 'number', 'koreanSpecial', 'special', 'englishSpecial'] as const

export const INPUT_DEFAULTS = {
  type: 'text',
  state: 'default',
  disabled: false,
  readonly: false,
  value: '',
} as const

export const INPUT_CLASS = {
  base: 'input-field',
  prefix: 'input-field--',
} as const

// ── Modal ─────────────────────────────────────────────────────────────────────

export const MODAL_TYPES = ['alert', 'confirm', 'plain'] as const

export const MODAL_DEFAULTS = {
  type: 'alert',
  backdrop: true,
  closeOnBackdrop: true,
  confirmLabel: '확인',
  cancelLabel: '취소',
} as const

export const MODAL_CLASS = {
  base: 'modal',
  overlay: 'modal-overlay',
  prefix: 'modal--',
  overlayPrefix: 'modal-overlay--',
} as const

// ── Toast ─────────────────────────────────────────────────────────────────────

export const TOAST_TYPES = ['info', 'success', 'warning', 'error'] as const
export const TOAST_POSITIONS = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
] as const

export const TOAST_DEFAULTS = {
  type: 'info',
  position: 'top-right',
  duration: 3000,
  closable: true,
} as const

export const TOAST_CLASS = {
  base: 'toast',
  container: 'toast-container',
  prefix: 'toast--',
  containerPrefix: 'toast-container--',
} as const

export const TOAST_ICONS: Record<string, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '✕',
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

export const CHECKBOX_STATES = ['default', 'error', 'warning', 'success'] as const

export const CHECKBOX_DEFAULTS = {
  state: 'default',
  checked: false,
  indeterminate: false,
  disabled: false,
} as const

export const CHECKBOX_CLASS = {
  base: 'checkbox',
  group: 'checkbox-group',
  prefix: 'checkbox--',
  groupPrefix: 'checkbox-group--',
} as const

// ── Radio ─────────────────────────────────────────────────────────────────────

export const RADIO_STATES = ['default', 'error', 'warning', 'success'] as const

export const RADIO_DEFAULTS = {
  state: 'default',
  checked: false,
  disabled: false,
} as const

export const RADIO_CLASS = {
  base: 'radio',
  group: 'radio-group',
  prefix: 'radio--',
  groupPrefix: 'radio-group--',
} as const

// ── Shared form group ─────────────────────────────────────────────────────────

export const FORM_GROUP_DIRECTIONS = ['vertical', 'horizontal'] as const
