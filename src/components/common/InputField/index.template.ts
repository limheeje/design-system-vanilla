import type { InputFieldOptions, InputFieldInstance, InputState } from '@/components/common/InputField/index.type'
import { INPUT_DEFAULTS, INPUT_CLASS } from '@/tokens/constants'

const FILTER_PATTERNS: Record<string, RegExp> = {
  korean:         /[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g,
  english:        /[^a-zA-Z\s]/g,
  number:         /[^0-9]/g,
  koreanSpecial:  /[^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~\s]/g,
  special:        /[^!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/g,
  englishSpecial: /[^a-zA-Z!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~\s]/g,
}

const STATE_MODS: InputState[] = ['error', 'warning', 'success']

function resolveSlot(slot: HTMLElement | string): Node {
  return typeof slot === 'string' ? document.createTextNode(slot) : slot
}

export function createInputFieldElement(options: InputFieldOptions): InputFieldInstance {
  const {
    id,
    name,
    type = INPUT_DEFAULTS.type,
    label,
    placeholder,
    value = INPUT_DEFAULTS.value,
    disabled = INPUT_DEFAULTS.disabled,
    readonly = INPUT_DEFAULTS.readonly,
    state = INPUT_DEFAULTS.state,
    message,
    prefix,
    suffix,
    filter,
    customFilter,
    maxLength,
    onChange,
    onInput,
    onFocus,
    onBlur,
  } = options

  // ── Container ─────────────────────────────────────────────────────────────

  const container = document.createElement('div')
  container.className = [
    INPUT_CLASS.base,
    state !== 'default' ? `${INPUT_CLASS.prefix}${state}` : null,
    disabled ? `${INPUT_CLASS.prefix}disabled` : null,
    readonly ? `${INPUT_CLASS.prefix}readonly` : null,
  ].filter(Boolean).join(' ')

  // ── Label ──────────────────────────────────────────────────────────────────

  if (label) {
    const labelEl = document.createElement('label')
    labelEl.className = `${INPUT_CLASS.base}__label`
    labelEl.textContent = label
    if (id) labelEl.htmlFor = id
    container.appendChild(labelEl)
  }

  // ── Wrapper (prefix · input · suffix) ─────────────────────────────────────

  const wrapper = document.createElement('div')
  wrapper.className = `${INPUT_CLASS.base}__wrapper`

  if (prefix) {
    const el = document.createElement('span')
    el.className = `${INPUT_CLASS.base}__prefix`
    el.appendChild(resolveSlot(prefix))
    wrapper.appendChild(el)
  }

  const inputEl = document.createElement('input')
  inputEl.className = `${INPUT_CLASS.base}__input`
  inputEl.type = type
  if (id) inputEl.id = id
  if (name) inputEl.name = name
  if (placeholder) inputEl.placeholder = placeholder
  if (maxLength !== undefined) inputEl.maxLength = maxLength
  inputEl.value = value
  inputEl.disabled = disabled
  inputEl.readOnly = readonly
  wrapper.appendChild(inputEl)

  if (suffix) {
    const el = document.createElement('span')
    el.className = `${INPUT_CLASS.base}__suffix`
    el.appendChild(resolveSlot(suffix))
    wrapper.appendChild(el)
  }

  container.appendChild(wrapper)

  // ── Message ────────────────────────────────────────────────────────────────

  const messageEl = document.createElement('span')
  messageEl.className = `${INPUT_CLASS.base}__message`
  if (message) messageEl.textContent = message
  container.appendChild(messageEl)

  // ── Filter logic ───────────────────────────────────────────────────────────

  function applyFilter(raw: string): { value: string; cursorDelta: number } {
    if (customFilter) {
      return { value: customFilter(raw), cursorDelta: 0 }
    }
    if (filter && FILTER_PATTERNS[filter]) {
      const pattern = FILTER_PATTERNS[filter]
      const filtered = raw.replace(pattern, '')
      return { value: filtered, cursorDelta: raw.length - filtered.length }
    }
    return { value: raw, cursorDelta: 0 }
  }

  // ── Events ─────────────────────────────────────────────────────────────────

  inputEl.addEventListener('input', (e) => {
    const raw = inputEl.value
    const cursorPos = inputEl.selectionStart ?? raw.length
    const { value: filtered, cursorDelta } = applyFilter(raw)

    if (filtered !== raw) {
      inputEl.value = filtered
      const newPos = Math.max(0, cursorPos - cursorDelta)
      inputEl.setSelectionRange(newPos, newPos)
    }

    onInput?.(inputEl.value, e)
  })

  inputEl.addEventListener('change', (e) => {
    onChange?.(inputEl.value, e)
  })

  inputEl.addEventListener('focus', (e) => {
    container.classList.add(`${INPUT_CLASS.prefix}focused`)
    onFocus?.(e as FocusEvent)
  })

  inputEl.addEventListener('blur', (e) => {
    container.classList.remove(`${INPUT_CLASS.prefix}focused`)
    onBlur?.(e as FocusEvent)
  })

  // ── State helpers ──────────────────────────────────────────────────────────

  function applyState(newState: InputState) {
    STATE_MODS.forEach(s => container.classList.remove(`${INPUT_CLASS.prefix}${s}`))
    if (newState !== 'default') container.classList.add(`${INPUT_CLASS.prefix}${newState}`)
  }

  // ── Instance API ───────────────────────────────────────────────────────────

  return {
    element: container,
    input: inputEl,

    getValue: () => inputEl.value,

    setValue: (val) => { inputEl.value = val },

    setState: applyState,

    setMessage(msg, newState) {
      messageEl.textContent = msg
      if (newState !== undefined) applyState(newState)
    },

    setDisabled(isDisabled) {
      inputEl.disabled = isDisabled
      container.classList.toggle(`${INPUT_CLASS.prefix}disabled`, isDisabled)
    },
  }
}
