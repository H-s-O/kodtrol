let __counter = {};
/**
 * @function counter
 * @description Creates a counter that increments by 1 everytime the function is called.
 * @param {String} [id="__default"] The counter identifier, when using more than one counter per script
 * @returns {Number} The current counter value
 * @example
 * let myCounter = counter()
 * // myCounter = 0
 * myCounter = counter()
 * // myCounter = 1
 */
export default function counter(id = '__default') {
    if (typeof __counter[id] === 'undefined') {
        __counter[id] = 0;
    }
    return __counter[id]++;
}
/**
 * @function counterReset
 * @description Resets a counter to its initial value of 0.
 * @param {String} [id="__default"] The counter identifier, when using more than one counter per script
 */
export function counterReset(id = '__default') {
    __counter[id] = 0;
}
/**
 * @function counterResetAll
 * @description Resets all the script's counters to their initial value of 0.
 */
export function counterResetAll() {
    __counter = {};
}