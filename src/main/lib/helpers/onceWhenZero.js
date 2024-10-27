let __onceWhenZero = {}
/**
 * @function onceWhenZero
 * @description Invokes a callback only once when the checked `value` is 0.
 * @param {*} value The value to check
 * @param {String} id The identifier for the check
 * @param {Function} callback The function to be invoked when the check succeeds
 */
export default function onceWhenZero(value, id, callback) {
    if (value === 0) {
        if (__onceWhenZero[id] !== false) {
            callback()
            __onceWhenZero[id] = false
        }
    } else {
        __onceWhenZero[id] = true
    }
}