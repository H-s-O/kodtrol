module.exports = class BaseScript {
  // "Macros"
  _clamp(value, min, max) {
    return (value < min ? min : value > max ? max : value);
  }
  _map(value, valueMin, valueMax, outMin, outMax) {
    return (outMin + (((value - valueMin) / (valueMax - valueMin) * (outMax - outMin))));
  }
  _randomBetween(min, max) {
    return (min + (Math.random() * (max - min)));
  }
  _randomIndex(arr) {
    return (Math.floor(Math.random() * arr.length));
  }
  _isBeatDivision(beat, division) {
    return (beat > 0 && beat % division === 0);
  }
  _step(value, step = 1) {
    return (Math.round(value / step) * step);
  }
  _smoothFollow(device, varName, divider = 1, value = null) {
    if (value === null) {
      value = device.getVar(varName);
    }
    const followVarName = `${varName}__follow`;
    if (!device.varIsSet(followVarName)) {
      device.setVar(followVarName, value);
    }
    let follow = device.getVar(followVarName);
    const diff = value - follow;
    follow += diff / divider;
    device.setVar(followVarName, follow);
    return follow;
  }
  _smoothReset(device, varName, value = null) {
    if (value === null) {
      value = device.getVar(varName);
    }
    const followVarName = `${varName}__follow`;
    device.setVar(followVarName, value);
    return value;
  }
};
