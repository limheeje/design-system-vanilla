# Vanilla Design System 구축 가이드

## 프로젝트 목표

순수 Vanilla JavaScript + TypeScript 기반 디자인 시스템 구축.

프레임워크(Vue/React 등)에 의존하지 않는다.

목표:

* 재사용 가능한 공통 컴포넌트 제공
* 디자인 일관성 유지
* 디자인 토큰 기반 관리
* 운영 및 유지보수 편의성 확보
* npm 배포 가능한 라이브러리 구조
* Git 기반 버전 관리

---

## Repository

Git Repository:
https://github.com/limheeje/design-system-vanilla.git

npm:
추후 설정 예정

---

## 기술 스택

* Vite
* TypeScript
* Vanilla JavaScript
* CSS Variables 기반 Design Token
* npm Package 배포 구조
* Git Workflow

---

## 핵심 원칙

### 1. 디자인 일관성

모든 UI는 반드시 아래 기준을 따른다.

관리 대상:

* Color
* Typography
* Spacing
* Radius
* Shadow
* Motion
* Layer(Z-index)

컴포넌트 내부 직접 값 사용 금지.

허용:

```css
color: var(--color-primary);
```

금지:

```css
color:#2f80ed;
```

---

### 2. 디자인 토큰 구조

구조:

src/
tokens/
color.css
typography.css
spacing.css
radius.css
shadow.css
motion.css

모든 컴포넌트는 token만 참조.

---

### 3. 컴포넌트 철학

컴포넌트는:

* 독립 실행 가능
* 최소 의존성
* 선언형 API
* 확장 가능
* 스타일 캡슐화

예:

Button.create()

Modal.open()

Toast.show()

---

### 4. 폴더 구조

root/

pages/
→ 라우트 담당

components/
→ 공통 컴포넌트

types/
→ 타입 정의

assets/
→ 빌드 대상 자산

static/
→ 정적 리소스

tokens/
→ 디자인 토큰

styles/
→ 글로벌 스타일

utils/
→ 유틸

hooks/
→ 상태 관리 및 헬퍼

examples/
→ 테스트 페이지

---

### 5. Alias 규칙

root 기준:

@/

예시:

```ts
import Button from '@/components/Button'
```

vite 설정 포함.

---

### 6. 컴포넌트 구조 규칙

모든 컴포넌트는 `components/common/` 하위에 위치하며, 파일명은 `index.*` 고정이다.

```
components/
  common/
    Button/
      index.ts          ← 공개 API 진입점
      index.css         ← 컴포넌트 스타일
      index.template.ts ← DOM 생성 로직
      index.type.ts     ← 타입 정의
    Modal/
      index.ts
      index.css
      index.template.ts
      index.type.ts
```

#### 6-1. 상수 관리 원칙

컴포넌트 내부에서 사용하는 변수명, 클래스명, 기본값, variant 목록 등 모든 고정값은
컴포넌트 내부에 직접 선언하지 않는다.

반드시 전역 상수 파일(`@/tokens/constants.ts`)에 선언하고, 컴포넌트에서 import하여 사용한다.

금지:

```ts
const variant = 'primary'
button.className = `btn btn--primary btn--md`
```

허용:

```ts
import { BUTTON_DEFAULTS, BUTTON_CLASS } from '@/tokens/constants'
button.className = `${BUTTON_CLASS.base} ${BUTTON_CLASS.variant(variant)}`
```

#### 6-2. Import 경로 규칙

컴포넌트 내부의 모든 import는 상대경로(`../`, `./` 등)를 사용하지 않는다.

반드시 alias `@/`를 사용한다.

금지:

```ts
import { ButtonOptions } from '../types/button'
import { BUTTON_VARIANTS } from '../../tokens/constants'
```

허용:

```ts
import type { ButtonOptions } from '@/components/common/Button/index.type'
import { BUTTON_VARIANTS } from '@/tokens/constants'
```

---

### 7. 빌드 목표

빌드 결과:

dist/

esm/
cjs/
style.css
index.d.ts

지원:

* ESM
* CommonJS
* Type Definition

---

### 8. Git 운영

브랜치:

main
develop
feature/*

커밋:

feat:
fix:
refactor:
docs:
chore:

---

## Claude 작업 규칙

1.

현재 디렉토리 분석

2.

폴더 생성

3.

vite alias 설정

4.

디자인 토큰 생성

5.

Button 컴포넌트 샘플 생성

6.

npm 배포 가능한 빌드 구성

7.

작업마다 변경 요약 출력

8.

파일 수정 전 계획 설명

9.

불필요한 라이브러리 설치 금지

10.

확장 가능성 우선
