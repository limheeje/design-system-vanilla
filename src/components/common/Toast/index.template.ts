import type { ToastOptions, ToastInstance, ToastPosition, ToastType } from '@/components/common/Toast/index.type'
import { TOAST_DEFAULTS, TOAST_CLASS, TOAST_ICONS } from '@/tokens/constants'

const containers = new Map<ToastPosition, HTMLDivElement>()

function getContainer(position: ToastPosition): HTMLDivElement {
  if (!containers.has(position)) {
    const el = document.createElement('div')
    el.className = `${TOAST_CLASS.container} ${TOAST_CLASS.containerPrefix}${position}`
    document.body.appendChild(el)
    containers.set(position, el)
  }
  return containers.get(position)!
}

function isBottomPosition(position: ToastPosition): boolean {
  return position.startsWith('bottom')
}

export function createToastElement(options: ToastOptions): ToastInstance {
  const {
    message,
    type = TOAST_DEFAULTS.type as ToastType,
    position = TOAST_DEFAULTS.position as ToastPosition,
    duration = TOAST_DEFAULTS.duration,
    closable = TOAST_DEFAULTS.closable,
    title,
    onClose,
  } = options

  const container = getContainer(position)

  // ── Toast element ──────────────────────────────────────────────────────────

  const toast = document.createElement('div')
  toast.className = `${TOAST_CLASS.base} ${TOAST_CLASS.prefix}${type}`
  toast.setAttribute('role', 'alert')

  // Icon
  const icon = document.createElement('span')
  icon.className = `${TOAST_CLASS.base}__icon`
  icon.textContent = TOAST_ICONS[type] ?? ''
  toast.appendChild(icon)

  // Body
  const body = document.createElement('div')
  body.className = `${TOAST_CLASS.base}__body`

  if (title) {
    const titleEl = document.createElement('strong')
    titleEl.className = `${TOAST_CLASS.base}__title`
    titleEl.textContent = title
    body.appendChild(titleEl)
  }

  const msgEl = document.createElement('span')
  msgEl.className = `${TOAST_CLASS.base}__message`
  msgEl.textContent = message
  body.appendChild(msgEl)

  toast.appendChild(body)

  // Close button
  if (closable) {
    const closeBtn = document.createElement('button')
    closeBtn.type = 'button'
    closeBtn.className = `${TOAST_CLASS.base}__close`
    closeBtn.setAttribute('aria-label', '닫기')
    closeBtn.textContent = '✕'
    closeBtn.addEventListener('click', close)
    toast.appendChild(closeBtn)
  }

  // ── Mount ──────────────────────────────────────────────────────────────────

  if (isBottomPosition(position)) {
    container.appendChild(toast)
  } else {
    container.prepend(toast)
  }

  // Trigger enter animation
  requestAnimationFrame(() => toast.classList.add('is-visible'))

  // ── Auto dismiss ───────────────────────────────────────────────────────────

  let timer: ReturnType<typeof setTimeout> | null = null

  if (duration > 0) {
    timer = setTimeout(close, duration)
  }

  // ── Close ──────────────────────────────────────────────────────────────────

  function close() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    toast.classList.remove('is-visible')
    setTimeout(() => {
      toast.remove()
      onClose?.()
    }, 200)
  }

  return { element: toast, close }
}
