import type { ButtonOptions } from './button.types'

export function createButtonElement(options: ButtonOptions): HTMLButtonElement {
  const { label, variant = 'primary', size = 'md', disabled = false, onClick } = options

  const button = document.createElement('button')
  button.className = `btn btn--${variant} btn--${size}`
  button.textContent = label
  button.disabled = disabled

  if (onClick) {
    button.addEventListener('click', onClick)
  }

  return button
}
