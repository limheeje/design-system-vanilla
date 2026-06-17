import type { ModalOptions, ModalInstance, ModalType } from '@/components/common/Modal/index.type'
import { MODAL_DEFAULTS, MODAL_CLASS } from '@/tokens/constants'

export function createModalElement(options: ModalOptions): ModalInstance {
  const {
    type = MODAL_DEFAULTS.type as ModalType,
    title,
    description,
    content,
    backdrop = MODAL_DEFAULTS.backdrop,
    closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
    confirmLabel = MODAL_DEFAULTS.confirmLabel,
    cancelLabel = MODAL_DEFAULTS.cancelLabel,
    onConfirm,
    onCancel,
    onClose,
  } = options

  // ── Overlay ────────────────────────────────────────────────────────────────

  const overlay = document.createElement('div')
  overlay.className = MODAL_CLASS.overlay
  if (!backdrop) overlay.classList.add(`${MODAL_CLASS.overlayPrefix}no-backdrop`)

  // ── Modal Box ──────────────────────────────────────────────────────────────

  const modal = document.createElement('div')
  modal.className = MODAL_CLASS.base
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  if (title) modal.setAttribute('aria-labelledby', 'modal-title')

  // ── Header ─────────────────────────────────────────────────────────────────

  if (title) {
    const header = document.createElement('div')
    header.className = `${MODAL_CLASS.base}__header`

    const titleEl = document.createElement('h2')
    titleEl.id = 'modal-title'
    titleEl.className = `${MODAL_CLASS.base}__title`
    titleEl.textContent = title
    header.appendChild(titleEl)

    modal.appendChild(header)
  }

  // ── Body ───────────────────────────────────────────────────────────────────

  const body = document.createElement('div')
  body.className = `${MODAL_CLASS.base}__body`

  if (content) {
    body.appendChild(content)
  } else if (description) {
    const desc = document.createElement('p')
    desc.className = `${MODAL_CLASS.base}__description`
    desc.textContent = description
    body.appendChild(desc)
  }

  modal.appendChild(body)

  // ── Footer ─────────────────────────────────────────────────────────────────

  if (type !== 'plain') {
    const footer = document.createElement('div')
    footer.className = `${MODAL_CLASS.base}__footer`

    if (type === 'confirm') {
      const cancelBtn = document.createElement('button')
      cancelBtn.type = 'button'
      cancelBtn.className = `${MODAL_CLASS.base}__btn ${MODAL_CLASS.base}__btn--cancel`
      cancelBtn.textContent = cancelLabel
      cancelBtn.addEventListener('click', () => {
        const result = onCancel?.()
        if (result !== false) close()
      })
      footer.appendChild(cancelBtn)
    }

    const confirmBtn = document.createElement('button')
    confirmBtn.type = 'button'
    confirmBtn.className = `${MODAL_CLASS.base}__btn ${MODAL_CLASS.base}__btn--confirm`
    confirmBtn.textContent = confirmLabel
    confirmBtn.addEventListener('click', () => {
      const result = onConfirm?.()
      if (result !== false) close()
    })
    footer.appendChild(confirmBtn)

    modal.appendChild(footer)
  }

  overlay.appendChild(modal)

  // ── Keyboard ───────────────────────────────────────────────────────────────

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }

  // ── Backdrop click ─────────────────────────────────────────────────────────

  overlay.addEventListener('click', (e) => {
    if (closeOnBackdrop && e.target === overlay) close()
  })

  // ── Open / Close / Destroy ─────────────────────────────────────────────────

  function open() {
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
    requestAnimationFrame(() => overlay.classList.add('is-open'))
  }

  function close() {
    overlay.classList.remove('is-open')
    document.removeEventListener('keydown', handleKeydown)
    setTimeout(() => {
      overlay.remove()
      document.body.style.overflow = ''
      onClose?.()
    }, 200)
  }

  function destroy() {
    document.removeEventListener('keydown', handleKeydown)
    overlay.remove()
    document.body.style.overflow = ''
  }

  return { element: overlay, open, close, destroy }
}
