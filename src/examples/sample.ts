import '@/styles/global.css'
import './sample.css'
import { Button } from '@/components/common/Button'
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@/tokens/constants'
import type { ButtonVariant, ButtonSize } from '@/components/common/Button'

// ── Layout ────────────────────────────────────────────────────────────────────

const layout = document.createElement('div')
layout.className = 'demo-layout'

const header = document.createElement('header')
header.className = 'demo-header'
header.innerHTML = `
  <h1 class="demo-header__title">Design System</h1>
  <span class="demo-header__badge">Vanilla + TypeScript</span>
`

const main = document.createElement('main')
main.className = 'demo-main'

layout.appendChild(header)
layout.appendChild(main)
document.body.appendChild(layout)

// ── Helpers ───────────────────────────────────────────────────────────────────

function createSection(title: string, tag: string): HTMLElement {
  const section = document.createElement('section')
  section.className = 'demo-section'

  const h2 = document.createElement('h2')
  h2.className = 'demo-section__title'
  h2.innerHTML = `${title} <span class="demo-section__tag">${tag}</span>`
  section.appendChild(h2)

  return section
}

function createGroup(title: string, desc?: string): { group: HTMLElement; content: HTMLElement } {
  const group = document.createElement('div')
  group.className = 'demo-group'

  const groupHeader = document.createElement('div')
  groupHeader.className = 'demo-group__header'
  groupHeader.innerHTML = `
    <span class="demo-group__title">${title}</span>
    ${desc ? `<span class="demo-group__desc">${desc}</span>` : ''}
  `
  group.appendChild(groupHeader)

  const content = document.createElement('div')
  content.className = 'demo-group__content'
  group.appendChild(content)

  return { group, content }
}

// ── Button Section ────────────────────────────────────────────────────────────

const buttonSection = createSection('Button', 'Button.create()')
main.appendChild(buttonSection)

// 1. Variants
const { group: variantsGroup, content: variantsContent } = createGroup(
  'Variants',
  'size: md',
)
BUTTON_VARIANTS.forEach((variant) => {
  variantsContent.appendChild(Button.create({ label: variant, variant, size: 'md' }))
})
buttonSection.appendChild(variantsGroup)

// 2. Sizes
const { group: sizesGroup, content: sizesContent } = createGroup(
  'Sizes',
  'variant: primary',
)
BUTTON_SIZES.forEach((size) => {
  sizesContent.appendChild(Button.create({ label: size, variant: 'primary', size }))
})
buttonSection.appendChild(sizesGroup)

// 3. Disabled
const { group: disabledGroup, content: disabledContent } = createGroup(
  'Disabled',
  'disabled: true',
)
BUTTON_VARIANTS.forEach((variant) => {
  disabledContent.appendChild(Button.create({ label: variant, variant, size: 'md', disabled: true }))
})
buttonSection.appendChild(disabledGroup)

// 4. Full Matrix (variants × sizes)
const matrixGroup = document.createElement('div')
matrixGroup.className = 'demo-group'
matrixGroup.innerHTML = `
  <div class="demo-group__header">
    <span class="demo-group__title">Matrix</span>
    <span class="demo-group__desc">variants × sizes</span>
  </div>
`
const matrix = document.createElement('div')
matrix.className = 'demo-matrix'

BUTTON_VARIANTS.forEach((variant: ButtonVariant) => {
  const row = document.createElement('div')
  row.className = 'demo-matrix__row'

  const rowLabel = document.createElement('span')
  rowLabel.className = 'demo-matrix__label'
  rowLabel.textContent = variant
  row.appendChild(rowLabel)

  BUTTON_SIZES.forEach((size: ButtonSize) => {
    row.appendChild(Button.create({ label: size, variant, size }))
  })

  matrix.appendChild(row)
})

matrixGroup.appendChild(matrix)
buttonSection.appendChild(matrixGroup)
