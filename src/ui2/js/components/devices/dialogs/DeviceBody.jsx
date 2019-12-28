import React from 'react';
import { InputGroup, TagInput, HTMLSelect, Intent } from "@blueprintjs/core";
import { useSelector } from 'react-redux';

import InlineFormGroup from '../../ui/InlineFormGroup';

const defaultValue = {
  name: null,
  type: null,
  output: null,
};

export default function DeviceBody({ value = defaultValue }) {
  const { type, output } = value;
  
  const outputs = useSelector((state) => state.outputs);

  return (
    <>
      <InlineFormGroup
        label="Name"
      >
        <InputGroup
          name="name"
        />
      </InlineFormGroup>
      <InlineFormGroup
        label="Type"
        helperText={!type ? 'A device type is mandatory.' : undefined}
        intent={!type ? Intent.DANGER : undefined}
      >
        <HTMLSelect
          name="type"
        >
          <option value="null">--</option>
          <option value="dmx">DMX</option>
          <option value="ilda">ILDA</option>
        </HTMLSelect>
      </InlineFormGroup>
      <InlineFormGroup
        label="Output"
        helperText={!output ? 'If not set, the device can still be used in scripts, but no data will be sent.' : undefined}
        intent={!output ? Intent.WARNING : undefined}
      >
        <HTMLSelect
          name="output"
        >
          <option value="null">--</option>
          {outputs.map(({ id, name }) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}
        </HTMLSelect>
      </InlineFormGroup>
      <InlineFormGroup
        label="Tags"
      >
        <TagInput
          name="tags"
          values={['tag1', 'tag2']}
        />
      </InlineFormGroup>
    </>
  )
}
