import React, { useCallback } from 'react';
import { RadioGroup } from '@blueprintjs/core';

export default function RadioInput({ value, onChange, ...otherProps }) {
  const changeHandler = useCallback(({ target: { value, name } }) => {
    if (typeof onChange === 'function') {
      const finalValue = value === 'null' || value === '' ? null : value;
      onChange(finalValue, name)
    }
  }, [onChange])

  const displayValue = value === null ? '' : value;

  return (
    <RadioGroup
      selectedValue={displayValue}
      onChange={changeHandler}
      {...otherProps}
    />
  );
}
