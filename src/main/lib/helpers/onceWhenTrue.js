let __onceWhenTrue = {}
/**
 * @function onceWhenTrue
 * @description Invokes a callback only once when the checked `value` is true.
 * @param {*} value The value to check
 * @param {String} id The identifier for the check
 * @param {Function} callback The function to be invoked when the check succeeds
 */
export default function onceWhenTrue(value, id, callback) {
    if (value === true) {
        if (__onceWhenTrue[id] !== false) {
            callback()
            __onceWhenTrue[id] = false
        }
    } else {
        __onceWhenTrue[id] = true
    }
}