import type { ButtonOptions } from '@/components/common/Button/index.type'
import { BUTTON_DEFAULTS, BUTTON_CLASS } from '@/tokens/constants'

function resolveSlot(slot: HTMLElement | string): Node {
  return typeof slot === 'string' ? document.createTextNode(slot) : slot
}

export function createButtonElement(options: ButtonOptions): HTMLButtonElement {
  const {
    label,
    variant = BUTTON_DEFAULTS.variant,
    size = BUTTON_DEFAULTS.size,
    disabled = BUTTON_DEFAULTS.disabled,
    state = BUTTON_DEFAULTS.state,
    onClick,
    prefix,
    suffix,
  } = options

  const isDisabled = disabled
  const isBlocked = disabled || state === 'loading' || state === 'readonly'

  const button = document.createElement('button')
  button.className = [
    BUTTON_CLASS.base,
    `${BUTTON_CLASS.prefix}${variant}`,
    `${BUTTON_CLASS.prefix}${size}`,
    state !== 'default' ? `${BUTTON_CLASS.prefix}${state}` : null,
    disabled ? `${BUTTON_CLASS.prefix}disabled` : null,
  ].filter(Boolean).join(' ')

  button.disabled = isDisabled

  if (state === 'loading') {
    button.setAttribute('aria-busy', 'true')
  }

  if (state === 'readonly') {
    button.setAttribute('aria-readonly', 'true')
  }

  if (prefix) {
    const el = document.createElement('span')
    el.className = `${BUTTON_CLASS.base}__prefix`
    el.appendChild(resolveSlot(prefix))
    button.appendChild(el)
  }

  if (state === 'loading') {
    const spinner = document.createElement('span')
    spinner.className = `${BUTTON_CLASS.base}__spinner`
    spinner.setAttribute('aria-hidden', 'true')
    button.appendChild(spinner)
  }

  const labelSpan = document.createElement('span')
  labelSpan.className = `${BUTTON_CLASS.base}__label`
  labelSpan.textContent = label
  button.appendChild(labelSpan)

  if (suffix) {
    const el = document.createElement('span')
    el.className = `${BUTTON_CLASS.base}__suffix`
    el.appendChild(resolveSlot(suffix))
    button.appendChild(el)
  }

  if (onClick && !isBlocked) {
    button.addEventListener('click', onClick)
  }

  return button
}
