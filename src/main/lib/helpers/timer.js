let __timer = {};
export default function timer(id = '__default') {
    if (typeof __timer[id] === 'undefined') {
        __timer[id] = Date.now();
    }
}
export function timerValue(id = '__default') {
    if (typeof __timer[id] === 'undefined') {
        return NaN;
    }
    return Date.now() - __timer[id];
}
export function timerLimit(limit, id = '__default') {
    if (typeof __timer[id] === 'undefined') {
        __timer[id] = Date.now();
    }
    return (Date.now() - __timer[id]) >= limit;
}
export function timerReset(id = '__default') {
    __timer[id] = Date.now();
}
export function timerResetAll() {
    __timer = {};
}
