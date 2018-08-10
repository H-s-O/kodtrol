import React from 'react';
import BaseModal from './BaseModal';

export default function(props) {
  return (
    <BaseModal
      {...props}
      relatedData={{
        deviceTypes: [
          { label: 'DMX / ArtNet', value: 'dmx' },
          { label: 'Serial', value: 'serial' },
        ],
      }}
      fields={[
        {
          label: 'Name',
          field: 'name',
          type: 'text',
        },
        {
          label: 'Group(s)',
          field: 'group',
          type: 'text',
        },
        {
          label: 'Device type',
          field: 'type',
          type: 'select',
          from: 'deviceTypes',
        },
      ]}
    />
  );
};
