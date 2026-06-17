import type { RadioOptions, RadioInstance, RadioState } from '@/components/common/Radio/index.type'
import { RADIO_DEFAULTS, RADIO_CLASS } from '@/tokens/constants'

const STATE_MODS: RadioState[] = ['error', 'warning', 'success']

export function createRadioElement(options: RadioOptions): RadioInstance {
  const {
    id,
    name,
    value,
    label,
    checked = RADIO_DEFAULTS.checked,
    disabled = RADIO_DEFAULTS.disabled,
    state = RADIO_DEFAULTS.state as RadioState,
    onChange,
  } = options

  // ── Container ──────────────────────────────────────────────────────────────

  const container = document.createElement('div')
  container.className = [
    RADIO_CLASS.base,
    state !== 'default' ? `${RADIO_CLASS.prefix}${state}` : null,
    disabled ? `${RADIO_CLASS.prefix}disabled` : null,
  ].filter(Boolean).join(' ')

  // ── Label wrap ─────────────────────────────────────────────────────────────

  const wrap = document.createElement('label')
  wrap.className = `${RADIO_CLASS.base}__wrap`

  // ── Control ────────────────────────────────────────────────────────────────

  const control = document.createElement('span')
  control.className = `${RADIO_CLASS.base}__control`

  const inputEl = document.createElement('input')
  inputEl.type = 'radio'
  inputEl.className = `${RADIO_CLASS.base}__input`
  if (id) inputEl.id = id
  inputEl.name = name
  inputEl.value = value
  inputEl.checked = checked
  inputEl.disabled = disabled

  const indicator = document.createElement('span')
  indicator.className = `${RADIO_CLASS.base}__indicator`
  indicator.setAttribute('aria-hidden', 'true')

  control.appendChild(inputEl)
  control.appendChild(indicator)
  wrap.appendChild(control)

  // ── Label text ─────────────────────────────────────────────────────────────

  if (label) {
    const labelEl = document.createElement('span')
    labelEl.className = `${RADIO_CLASS.base}__label`
    labelEl.textContent = label
    wrap.appendChild(labelEl)
  }

  container.appendChild(wrap)

  // ── Events ─────────────────────────────────────────────────────────────────

  inputEl.addEventListener('change', (e) => {
    if (inputEl.checked) onChange?.(value, e)
  })

  // ── State helpers ──────────────────────────────────────────────────────────

  function applyState(newState: RadioState) {
    STATE_MODS.forEach(s => container.classList.remove(`${RADIO_CLASS.prefix}${s}`))
    if (newState !== 'default') container.classList.add(`${RADIO_CLASS.prefix}${newState}`)
  }

  return {
    element: container,
    input: inputEl,
    isChecked: () => inputEl.checked,
    setChecked: (val) => { inputEl.checked = val },
    setDisabled: (val) => {
      inputEl.disabled = val
      container.classList.toggle(`${RADIO_CLASS.prefix}disabled`, val)
    },
    setState: applyState,
  }
}
