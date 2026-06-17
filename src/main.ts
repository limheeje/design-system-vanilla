import '@/styles/global.css'
import { Button } from '@/components/common/Button'
import { InputField } from '@/components/common/InputField'
import { Modal } from '@/components/common/Modal'
import { Toast } from '@/components/common/Toast'
import { Checkbox } from '@/components/common/Checkbox'
import { CheckboxGroup } from '@/components/common/CheckboxGroup'
import { Radio } from '@/components/common/Radio'
import { RadioGroup } from '@/components/common/RadioGroup'
import { BUTTON_VARIANTS } from '@/tokens/constants'

const app = document.querySelector<HTMLDivElement>('#app')!

// ── Buttons ────────────────────────────────────────────────────────────────────

const btnSection = document.createElement('section')
btnSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px'

BUTTON_VARIANTS.forEach((variant) => {
  const btn = Button.create({
    label: variant,
    variant,
    onClick: () => console.log(`${variant} clicked`),
  })
  btnSection.appendChild(btn)
})

app.appendChild(btnSection)

// ── InputField ─────────────────────────────────────────────────────────────────

const inputSection = document.createElement('section')
inputSection.style.cssText = 'display:flex;flex-direction:column;gap:20px;max-width:400px'

// 기본 텍스트
const { element: textInput } = InputField.create({
  label: '이름',
  type: 'text',
  placeholder: '이름을 입력하세요',
})
inputSection.appendChild(textInput)

// 이메일 + 검증 메시지
const { element: emailInput, setMessage, setState } = InputField.create({
  label: '이메일',
  type: 'email',
  placeholder: 'hello@example.com',
  suffix: '✉',
  onBlur: (e) => {
    const val = (e.target as HTMLInputElement).value
    if (!val) return
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    if (ok) {
      setMessage('사용 가능한 이메일입니다', 'success')
      setState('success')
    } else {
      setMessage('올바른 이메일 형식이 아닙니다', 'error')
      setState('error')
    }
  },
})
inputSection.appendChild(emailInput)

// 숫자 필터
const { element: numInput } = InputField.create({
  label: '전화번호',
  type: 'tel',
  placeholder: '숫자만 입력',
  prefix: '📞',
  filter: 'number',
  maxLength: 11,
})
inputSection.appendChild(numInput)

// 비밀번호
const { element: pwInput } = InputField.create({
  label: '비밀번호',
  type: 'password',
  placeholder: '비밀번호를 입력하세요',
  message: '영문+특수문자 조합을 권장합니다',
  filter: 'englishSpecial',
})
inputSection.appendChild(pwInput)

// Readonly
const { element: readonlyInput } = InputField.create({
  label: 'Readonly',
  type: 'text',
  value: '수정 불가 값',
  readonly: true,
})
inputSection.appendChild(readonlyInput)

// Disabled
const { element: disabledInput } = InputField.create({
  label: 'Disabled',
  type: 'text',
  placeholder: '비활성화된 입력',
  disabled: true,
})
inputSection.appendChild(disabledInput)

app.appendChild(inputSection)

// ── Modal ──────────────────────────────────────────────────────────────────────

const modalSection = document.createElement('section')
modalSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:32px'

// Alert: 확인 버튼 1개
modalSection.appendChild(
  Button.create({
    label: 'Alert',
    variant: 'primary',
    onClick: () =>
      Modal.create({
        type: 'alert',
        title: '저장 완료',
        description: '변경사항이 성공적으로 저장되었습니다.',
        confirmLabel: '확인',
      }).open(),
  }),
)

// Confirm: 취소 + 확인 2개, 라벨 커스텀
modalSection.appendChild(
  Button.create({
    label: 'Confirm (라벨 변경)',
    variant: 'secondary',
    onClick: () =>
      Modal.create({
        type: 'confirm',
        title: '정말 삭제하시겠습니까?',
        description: '삭제된 데이터는 복구할 수 없습니다.',
        confirmLabel: '삭제하기',
        cancelLabel: '돌아가기',
        onConfirm: () => console.log('삭제 확인'),
        onCancel: () => console.log('삭제 취소'),
      }).open(),
  }),
)

// Plain: 버튼 없음
modalSection.appendChild(
  Button.create({
    label: 'Plain (버튼 없음)',
    variant: 'ghost',
    onClick: () =>
      Modal.create({
        type: 'plain',
        title: '이용약관',
        description: '버튼 없는 모달입니다. 백드롭 클릭 또는 ESC로 닫습니다.',
      }).open(),
  }),
)

// 백드롭 없음
modalSection.appendChild(
  Button.create({
    label: '백드롭 없음',
    variant: 'ghost',
    onClick: () =>
      Modal.create({
        type: 'alert',
        title: '백드롭 없음',
        description: '어두운 배경 없이 모달 박스만 표시됩니다.',
        backdrop: false,
      }).open(),
  }),
)

// 백드롭 클릭 닫기 불가
modalSection.appendChild(
  Button.create({
    label: '백드롭 닫기 불가',
    variant: 'danger',
    onClick: () =>
      Modal.create({
        type: 'confirm',
        title: '필수 선택',
        description: '백드롭을 클릭해도 닫히지 않습니다. 버튼으로만 닫을 수 있습니다.',
        closeOnBackdrop: false,
        confirmLabel: '동의합니다',
        cancelLabel: '취소',
      }).open(),
  }),
)

// 제목 없음 (description만)
modalSection.appendChild(
  Button.create({
    label: '제목 없음',
    variant: 'secondary',
    onClick: () =>
      Modal.create({
        type: 'alert',
        description: '타이틀 없이 설명 텍스트만 있는 모달입니다.',
      }).open(),
  }),
)

app.appendChild(modalSection)

// ── Toast ───────────────────────────────────────────────────────────────────────

const toastSection = document.createElement('section')
toastSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:32px'

// 타입별
toastSection.appendChild(
  Button.create({
    label: 'Info',
    variant: 'secondary',
    onClick: () => Toast.show({ message: '새로운 업데이트가 있습니다.', type: 'info' }),
  }),
)
toastSection.appendChild(
  Button.create({
    label: 'Success',
    variant: 'secondary',
    onClick: () => Toast.show({ message: '저장되었습니다.', type: 'success', title: '성공' }),
  }),
)
toastSection.appendChild(
  Button.create({
    label: 'Warning',
    variant: 'secondary',
    onClick: () => Toast.show({ message: '저장 공간이 부족합니다.', type: 'warning', title: '주의' }),
  }),
)
toastSection.appendChild(
  Button.create({
    label: 'Error',
    variant: 'danger',
    onClick: () => Toast.show({ message: '요청을 처리하지 못했습니다.', type: 'error', title: '오류' }),
  }),
)

// 위치 변형
toastSection.appendChild(
  Button.create({
    label: 'Bottom-left',
    variant: 'ghost',
    onClick: () =>
      Toast.show({ message: '왼쪽 하단 토스트', type: 'info', position: 'bottom-left' }),
  }),
)
toastSection.appendChild(
  Button.create({
    label: 'Bottom-center',
    variant: 'ghost',
    onClick: () =>
      Toast.show({ message: '하단 중앙 토스트', type: 'success', position: 'bottom-center' }),
  }),
)

// 지속 (닫기 버튼으로만 닫힘)
toastSection.appendChild(
  Button.create({
    label: '지속 (수동 닫기)',
    variant: 'ghost',
    onClick: () =>
      Toast.show({ message: '버튼을 눌러야 닫힙니다.', type: 'warning', duration: 0 }),
  }),
)

// closable: false
toastSection.appendChild(
  Button.create({
    label: '닫기 버튼 없음',
    variant: 'ghost',
    onClick: () =>
      Toast.show({ message: '1.5초 후 자동으로 사라집니다.', type: 'info', closable: false, duration: 1500 }),
  }),
)

app.appendChild(toastSection)

// ── Checkbox ───────────────────────────────────────────────────────────────────

const checkboxSection = document.createElement('section')
checkboxSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:24px;margin-top:32px;align-items:flex-start'

// 기본
checkboxSection.appendChild(
  Checkbox.create({ label: '기본 체크박스', value: 'basic' }).element,
)

// 체크된 상태
checkboxSection.appendChild(
  Checkbox.create({ label: '기본 선택됨', value: 'checked', checked: true }).element,
)

// Indeterminate
checkboxSection.appendChild(
  Checkbox.create({ label: '부분 선택 (indeterminate)', indeterminate: true }).element,
)

// 에러 상태
checkboxSection.appendChild(
  Checkbox.create({
    label: '에러 상태',
    state: 'error',
    message: '필수 항목입니다',
  }).element,
)

// 비활성화
checkboxSection.appendChild(
  Checkbox.create({ label: '비활성화', disabled: true }).element,
)

app.appendChild(checkboxSection)

// ── CheckboxGroup ──────────────────────────────────────────────────────────────

const cbgSection = document.createElement('section')
cbgSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:40px;margin-top:32px;align-items:flex-start'

// 수직 + required + validate
const { element: cbgEl, validate: cbgValidate } = CheckboxGroup.create({
  legend: '관심 분야 (필수)',
  required: true,
  min: 1,
  max: 3,
  message: '최대 3개까지 선택 가능합니다',
  items: [
    { value: 'design', label: '디자인' },
    { value: 'dev', label: '개발' },
    { value: 'pm', label: 'PM' },
    { value: 'marketing', label: '마케팅' },
  ],
  onChange: (vals) => console.log('선택된 항목:', vals),
})
cbgSection.appendChild(cbgEl)

// 수평 + 초기값
const { element: cbgHEl } = CheckboxGroup.create({
  legend: '수평 레이아웃',
  direction: 'horizontal',
  values: ['option2'],
  items: [
    { value: 'option1', label: '옵션 A' },
    { value: 'option2', label: '옵션 B' },
    { value: 'option3', label: '옵션 C', disabled: true },
  ],
})
cbgSection.appendChild(cbgHEl)

// 검증 버튼
const cbgValidateBtn = Button.create({
  label: 'CheckboxGroup 검증',
  variant: 'secondary',
  onClick: () => {
    const ok = cbgValidate()
    if (ok) Toast.show({ message: '검증 통과', type: 'success' })
  },
})
cbgSection.appendChild(cbgValidateBtn)

app.appendChild(cbgSection)

// ── RadioGroup ─────────────────────────────────────────────────────────────────

const rgSection = document.createElement('section')
rgSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:40px;margin-top:32px;align-items:flex-start'

// 수직 + required + validate
const { element: rgEl, validate: rgValidate, getValue: rgGetValue } = RadioGroup.create({
  legend: '결제 수단 (필수)',
  required: true,
  message: '결제 수단을 선택해주세요',
  items: [
    { value: 'card', label: '신용카드' },
    { value: 'transfer', label: '계좌이체' },
    { value: 'phone', label: '휴대폰 결제' },
    { value: 'crypto', label: '가상화폐', disabled: true },
  ],
  onChange: (val) => console.log('선택:', val),
})
rgSection.appendChild(rgEl)

// 수평 + 초기값
const { element: rgHEl } = RadioGroup.create({
  legend: '성별',
  direction: 'horizontal',
  value: 'male',
  items: [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' },
    { value: 'other', label: '기타' },
  ],
})
rgSection.appendChild(rgHEl)

// 검증 버튼
const rgValidateBtn = Button.create({
  label: 'RadioGroup 검증',
  variant: 'secondary',
  onClick: () => {
    const ok = rgValidate()
    if (ok) Toast.show({ message: `선택: ${rgGetValue()}`, type: 'success' })
  },
})
rgSection.appendChild(rgValidateBtn)

app.appendChild(rgSection)
