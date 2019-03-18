export const BASE_SCREEN_WIDTH = 750;
export const BASE_FONT_SIZE = 37.5;

export function readyTCPlayer(callback) {
  if (!window.TCPlayer) {
    const time = setInterval(() => {
      if (window.TCPlayer) {
        callback();
        clearInterval(time);
      }
    }, 300);
  } else {
    callback();
  }
}
