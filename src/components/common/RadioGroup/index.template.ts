import type { RadioGroupOptions, RadioGroupInstance } from '@/components/common/RadioGroup/index.type'
import type { RadioState } from '@/components/common/Radio/index.type'
import { RADIO_DEFAULTS, RADIO_CLASS } from '@/tokens/constants'

let _groupId = 0

const STATE_MODS: RadioState[] = ['error', 'warning', 'success']

export function createRadioGroupElement(options: RadioGroupOptions): RadioGroupInstance {
  const {
    name = `rg-${++_groupId}`,
    legend,
    items,
    value: initialValue,
    required = false,
    direction = 'vertical',
    message,
    state = RADIO_DEFAULTS.state as RadioState,
    onChange,
  } = options

  // ── Fieldset ───────────────────────────────────────────────────────────────

  const fieldset = document.createElement('fieldset')
  fieldset.className = [
    RADIO_CLASS.group,
    state !== 'default' ? `${RADIO_CLASS.groupPrefix}${state}` : null,
    direction === 'horizontal' ? `${RADIO_CLASS.group}--horizontal` : null,
  ].filter(Boolean).join(' ')

  // ── Legend ─────────────────────────────────────────────────────────────────

  if (legend) {
    const legendEl = document.createElement('legend')
    legendEl.className = `${RADIO_CLASS.group}__legend`

    const legendText = document.createTextNode(legend)
    legendEl.appendChild(legendText)

    if (required) {
      const req = document.createElement('span')
      req.className = `${RADIO_CLASS.group}__required`
      req.textContent = ' *'
      req.setAttribute('aria-hidden', 'true')
      legendEl.appendChild(req)
    }

    fieldset.appendChild(legendEl)
  }

  // ── Items ──────────────────────────────────────────────────────────────────

  const itemsEl = document.createElement('div')
  itemsEl.className = `${RADIO_CLASS.group}__items`

  const inputs: HTMLInputElement[] = []

  items.forEach((item) => {
    const itemId = `${name}-${item.value}`

    const radioDiv = document.createElement('div')
    radioDiv.className = [
      RADIO_CLASS.base,
      item.disabled ? `${RADIO_CLASS.prefix}disabled` : null,
    ].filter(Boolean).join(' ')

    const wrap = document.createElement('label')
    wrap.className = `${RADIO_CLASS.base}__wrap`

    const control = document.createElement('span')
    control.className = `${RADIO_CLASS.base}__control`

    const inputEl = document.createElement('input')
    inputEl.type = 'radio'
    inputEl.className = `${RADIO_CLASS.base}__input`
    inputEl.id = itemId
    inputEl.name = name
    inputEl.value = item.value
    inputEl.checked = item.value === initialValue
    inputEl.disabled = item.disabled ?? false

    const indicator = document.createElement('span')
    indicator.className = `${RADIO_CLASS.base}__indicator`
    indicator.setAttribute('aria-hidden', 'true')

    control.appendChild(inputEl)
    control.appendChild(indicator)
    wrap.appendChild(control)

    const labelEl = document.createElement('span')
    labelEl.className = `${RADIO_CLASS.base}__label`
    labelEl.textContent = item.label
    wrap.appendChild(labelEl)

    radioDiv.appendChild(wrap)
    itemsEl.appendChild(radioDiv)
    inputs.push(inputEl)

    inputEl.addEventListener('change', (e) => {
      if (inputEl.checked) onChange?.(item.value, e)
    })
  })

  fieldset.appendChild(itemsEl)

  // ── Message ────────────────────────────────────────────────────────────────

  const messageEl = document.createElement('span')
  messageEl.className = `${RADIO_CLASS.group}__message`
  if (message) messageEl.textContent = message
  fieldset.appendChild(messageEl)

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getValue(): string | null {
    return inputs.find(i => i.checked)?.value ?? null
  }

  function setValue(val: string) {
    inputs.forEach(i => { i.checked = i.value === val })
  }

  function applyState(newState: RadioState) {
    STATE_MODS.forEach(s => fieldset.classList.remove(`${RADIO_CLASS.groupPrefix}${s}`))
    if (newState !== 'default') fieldset.classList.add(`${RADIO_CLASS.groupPrefix}${newState}`)
  }

  function setMessage(msg: string, newState?: RadioState) {
    messageEl.textContent = msg
    if (newState !== undefined) applyState(newState)
  }

  function validate(): boolean {
    if (required && getValue() === null) {
      setMessage('필수 항목을 선택해주세요', 'error')
      return false
    }
    applyState('default')
    messageEl.textContent = message ?? ''
    return true
  }

  return { element: fieldset, getValue, setValue, setState: applyState, setMessage, validate }
}
