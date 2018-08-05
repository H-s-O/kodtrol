import React, { PureComponent } from 'react';
import BaseModal from './BaseModal';

class TimelineTriggerModal extends PureComponent {
  render = () => {
    const { layers, ...props } = this.props;
    return (
      <BaseModal
        {...props}
        relatedData={{
          layers: layers.map((layer, index) => ({
            id: index,
            label: index + 1,
          })),
        }}
        fields={[
          {
            label: 'Trigger',
            field: 'trigger',
            type: 'text',
          },
          {
            label: 'Layer',
            field: 'layer',
            type: 'select',
            from: 'layers',
          },
          {
            label: 'Time',
            field: 'inTime',
            type: 'number',
          },
          {
            label: 'Color',
            field: 'color',
            type: 'color',
          },
        ]}
      />
    );
  }
}

export default TimelineTriggerModal;
