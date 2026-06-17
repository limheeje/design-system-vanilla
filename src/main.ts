import '@/styles/global.css';
import { Button } from '@/components/Button';
import { BUTTON_VARIANTS } from '@/tokens/constants';

const app = document.querySelector<HTMLDivElement>('#app')!;

BUTTON_VARIANTS.forEach((variant) => {
  const btn = Button.create({
    label: variant,
    variant,
    onClick: () => console.log(`${variant} clicked`), // eslint-disable-line no-console
  });
  app.appendChild(btn);
});
