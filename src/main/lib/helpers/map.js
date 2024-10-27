/**
 * @function map
 * @description Using a source value and its known range, re-maps that value to a new target range. Note that the result is <strong>not</strong> clamped, so you may end up with under or over-shooting output values.
 * @param {Number} value The input value
 * @param {Number} valueMin The minimum value of the input range
 * @param {Number} valueMax The maximum value of the input range
 * @param {Number} outMin The minimum value of the output range
 * @param {Number} outMax The maximum value of the output range
 * @returns {Number} The mapped value
 * @example
 * map(75, 50, 100, 0, 1)
 * // Returns 0.5
 *
 * map(0.5, 0, 1, 0, 100)
 * // Returns 50
 */
export default function map(value, valueMin, valueMax, outMin, outMax) {
    return (outMin + (((value - valueMin) / (valueMax - valueMin) * (outMax - outMin))));
}
