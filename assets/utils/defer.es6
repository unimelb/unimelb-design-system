import { throttle } from 'utils';

/**
 * Create a deferred function.
 * Uses lodash's `throttle` function under the hood, with a wait time of 0.
 * Useful for deferring event handlers (but not those that actually need to be throttled, like `scroll`).
 * @param {Function} func - the function to defer
 * @return {Function}
 */
export default function defer(func) {
  return throttle(func, 0, { leading: false });
}
