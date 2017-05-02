/**
 * Easing function used for smooth scroll.
 */
export default function easeInOutQuad(curr, start, change, duration) {
  curr /= duration / 2;

  if (curr < 1) {
    return change / 2 * curr * curr + start;
  }

  curr -= 1;
  return -change / 2 * (curr * (curr - 2) - 1) + start;
}
