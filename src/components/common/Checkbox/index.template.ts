import type { CheckboxOptions, CheckboxInstance, CheckboxState } from '@/components/common/Checkbox/index.type'
import { CHECKBOX_DEFAULTS, CHECKBOX_CLASS } from '@/tokens/constants'

const STATE_MODS: CheckboxState[] = ['error', 'warning', 'success']

export function createCheckboxElement(options: CheckboxOptions): CheckboxInstance {
  const {
    id,
    name,
    value,
    label,
    checked = CHECKBOX_DEFAULTS.checked,
    indeterminate = CHECKBOX_DEFAULTS.indeterminate,
    disabled = CHECKBOX_DEFAULTS.disabled,
    state = CHECKBOX_DEFAULTS.state as CheckboxState,
    message,
    onChange,
  } = options

  // ── Container ──────────────────────────────────────────────────────────────

  const container = document.createElement('div')
  container.className = [
    CHECKBOX_CLASS.base,
    state !== 'default' ? `${CHECKBOX_CLASS.prefix}${state}` : null,
    disabled ? `${CHECKBOX_CLASS.prefix}disabled` : null,
  ].filter(Boolean).join(' ')

  // ── Label wrap ─────────────────────────────────────────────────────────────

  const wrap = document.createElement('label')
  wrap.className = `${CHECKBOX_CLASS.base}__wrap`

  // ── Control ────────────────────────────────────────────────────────────────

  const control = document.createElement('span')
  control.className = `${CHECKBOX_CLASS.base}__control`

  const inputEl = document.createElement('input')
  inputEl.type = 'checkbox'
  inputEl.className = `${CHECKBOX_CLASS.base}__input`
  if (id) inputEl.id = id
  if (name) inputEl.name = name
  if (value !== undefined) inputEl.value = value
  inputEl.checked = checked
  inputEl.disabled = disabled
  inputEl.indeterminate = indeterminate

  const indicator = document.createElement('span')
  indicator.className = `${CHECKBOX_CLASS.base}__indicator`
  indicator.setAttribute('aria-hidden', 'true')

  control.appendChild(inputEl)
  control.appendChild(indicator)
  wrap.appendChild(control)

  // ── Label text ─────────────────────────────────────────────────────────────

  if (label) {
    const labelEl = document.createElement('span')
    labelEl.className = `${CHECKBOX_CLASS.base}__label`
    labelEl.textContent = label
    wrap.appendChild(labelEl)
  }

  container.appendChild(wrap)

  // ── Message ────────────────────────────────────────────────────────────────

  const messageEl = document.createElement('span')
  messageEl.className = `${CHECKBOX_CLASS.base}__message`
  if (message) messageEl.textContent = message
  container.appendChild(messageEl)

  // ── Events ─────────────────────────────────────────────────────────────────

  inputEl.addEventListener('change', (e) => onChange?.(inputEl.checked, e))

  // ── State helpers ──────────────────────────────────────────────────────────

  function applyState(newState: CheckboxState) {
    STATE_MODS.forEach(s => container.classList.remove(`${CHECKBOX_CLASS.prefix}${s}`))
    if (newState !== 'default') container.classList.add(`${CHECKBOX_CLASS.prefix}${newState}`)
  }

  return {
    element: container,
    input: inputEl,
    isChecked: () => inputEl.checked,
    setChecked: (val) => { inputEl.checked = val },
    setIndeterminate: (val) => { inputEl.indeterminate = val },
    setDisabled: (val) => {
      inputEl.disabled = val
      container.classList.toggle(`${CHECKBOX_CLASS.prefix}disabled`, val)
    },
    setState: applyState,
    setMessage: (msg, newState) => {
      messageEl.textContent = msg
      if (newState !== undefined) applyState(newState)
    },
  }
}
