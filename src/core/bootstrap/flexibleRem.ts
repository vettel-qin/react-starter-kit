import { BASE_FONT_SIZE, BASE_SCREEN_WIDTH } from '~/config';

function scaleFontSize() {
  const docEl = document.documentElement;
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  const fontSize = (screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE;
  docEl.style.fontSize = (fontSize > BASE_FONT_SIZE ? `${BASE_FONT_SIZE}px` : `${fontSize}px`);
}

export default function flexibleRem() {
  scaleFontSize();

  window.addEventListener('resize', scaleFontSize, false);
}
