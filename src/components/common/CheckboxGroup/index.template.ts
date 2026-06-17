import type { CheckboxGroupOptions, CheckboxGroupInstance } from '@/components/common/CheckboxGroup/index.type'
import type { CheckboxState } from '@/components/common/Checkbox/index.type'
import { CHECKBOX_DEFAULTS, CHECKBOX_CLASS } from '@/tokens/constants'

let _groupId = 0

const STATE_MODS: CheckboxState[] = ['error', 'warning', 'success']

export function createCheckboxGroupElement(options: CheckboxGroupOptions): CheckboxGroupInstance {
  const {
    name = `cbg-${++_groupId}`,
    legend,
    items,
    values: initialValues = [],
    required = false,
    min,
    max,
    direction = 'vertical',
    message,
    state = CHECKBOX_DEFAULTS.state as CheckboxState,
    onChange,
  } = options

  // ── Fieldset ───────────────────────────────────────────────────────────────

  const fieldset = document.createElement('fieldset')
  fieldset.className = [
    CHECKBOX_CLASS.group,
    state !== 'default' ? `${CHECKBOX_CLASS.groupPrefix}${state}` : null,
    direction === 'horizontal' ? `${CHECKBOX_CLASS.group}--horizontal` : null,
  ].filter(Boolean).join(' ')

  // ── Legend ─────────────────────────────────────────────────────────────────

  if (legend) {
    const legendEl = document.createElement('legend')
    legendEl.className = `${CHECKBOX_CLASS.group}__legend`

    const legendText = document.createTextNode(legend)
    legendEl.appendChild(legendText)

    if (required) {
      const req = document.createElement('span')
      req.className = `${CHECKBOX_CLASS.group}__required`
      req.textContent = ' *'
      req.setAttribute('aria-hidden', 'true')
      legendEl.appendChild(req)
    }

    fieldset.appendChild(legendEl)
  }

  // ── Items ──────────────────────────────────────────────────────────────────

  const itemsEl = document.createElement('div')
  itemsEl.className = `${CHECKBOX_CLASS.group}__items`

  const inputs: HTMLInputElement[] = []

  items.forEach((item) => {
    const itemId = `${name}-${item.value}`

    const checkboxDiv = document.createElement('div')
    checkboxDiv.className = [
      CHECKBOX_CLASS.base,
      item.disabled ? `${CHECKBOX_CLASS.prefix}disabled` : null,
    ].filter(Boolean).join(' ')

    const wrap = document.createElement('label')
    wrap.className = `${CHECKBOX_CLASS.base}__wrap`

    const control = document.createElement('span')
    control.className = `${CHECKBOX_CLASS.base}__control`

    const inputEl = document.createElement('input')
    inputEl.type = 'checkbox'
    inputEl.className = `${CHECKBOX_CLASS.base}__input`
    inputEl.id = itemId
    inputEl.name = name
    inputEl.value = item.value
    inputEl.checked = item.checked ?? initialValues.includes(item.value)
    inputEl.disabled = item.disabled ?? false

    const indicator = document.createElement('span')
    indicator.className = `${CHECKBOX_CLASS.base}__indicator`
    indicator.setAttribute('aria-hidden', 'true')

    control.appendChild(inputEl)
    control.appendChild(indicator)
    wrap.appendChild(control)

    const labelEl = document.createElement('span')
    labelEl.className = `${CHECKBOX_CLASS.base}__label`
    labelEl.textContent = item.label
    wrap.appendChild(labelEl)

    checkboxDiv.appendChild(wrap)
    itemsEl.appendChild(checkboxDiv)
    inputs.push(inputEl)

    inputEl.addEventListener('change', (e) => {
      if (max !== undefined && inputs.filter(i => i.checked).length > max) {
        inputEl.checked = false
        return
      }
      onChange?.(getValues(), e)
    })
  })

  fieldset.appendChild(itemsEl)

  // ── Message ────────────────────────────────────────────────────────────────

  const messageEl = document.createElement('span')
  messageEl.className = `${CHECKBOX_CLASS.group}__message`
  if (message) messageEl.textContent = message
  fieldset.appendChild(messageEl)

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getValues(): string[] {
    return inputs.filter(i => i.checked).map(i => i.value)
  }

  function setValues(vals: string[]) {
    inputs.forEach(i => { i.checked = vals.includes(i.value) })
  }

  function applyState(newState: CheckboxState) {
    STATE_MODS.forEach(s => fieldset.classList.remove(`${CHECKBOX_CLASS.groupPrefix}${s}`))
    if (newState !== 'default') fieldset.classList.add(`${CHECKBOX_CLASS.groupPrefix}${newState}`)
  }

  function setMessage(msg: string, newState?: CheckboxState) {
    messageEl.textContent = msg
    if (newState !== undefined) applyState(newState)
  }

  function validate(): boolean {
    const vals = getValues()
    if (required && vals.length === 0) {
      setMessage('필수 항목을 하나 이상 선택해주세요', 'error')
      return false
    }
    if (min !== undefined && vals.length < min) {
      setMessage(`최소 ${min}개 이상 선택해주세요`, 'error')
      return false
    }
    if (max !== undefined && vals.length > max) {
      setMessage(`최대 ${max}개까지 선택 가능합니다`, 'error')
      return false
    }
    applyState('default')
    messageEl.textContent = message ?? ''
    return true
  }

  return { element: fieldset, getValues, setValues, setState: applyState, setMessage, validate }
}
