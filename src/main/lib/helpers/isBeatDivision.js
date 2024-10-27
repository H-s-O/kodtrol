/**
 * @function isBeatDivision
 * @description Check if a pulse-per-quarter-note value from Kodtrol's engine is divisible by a value.
 * @param {Number} beat The pulse-per-quarter-note value
 * @param {Number} division The divider
 * @param {Boolean} [allowFirst=false] Only return true for `beat` values higher than 0
 * @returns {Boolean} Returns true if the pulse-per-quarter-note is divisible, false otherwise.
 */
export default function isBeatDivision(beat, division, allowFirst = false) {
    if (allowFirst) {
        return (beat === 0 || beat % division === 0);
    }
    return (beat > 0 && beat % division === 0);
}