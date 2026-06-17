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

components/

Button/
index.ts
button.css
button.template.ts
button.types.ts

Modal/
index.ts
modal.css
modal.types.ts

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
