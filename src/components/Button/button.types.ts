import type { BUTTON_VARIANTS, BUTTON_SIZES } from '@/tokens/constants';

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonOptions {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}
