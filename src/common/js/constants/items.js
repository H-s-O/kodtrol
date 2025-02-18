export const ITEM_SCRIPT = 1;
export const ITEM_TRIGGER = 2;
export const ITEM_CURVE = 3;
export const ITEM_MEDIA = 4;

export const ITEM_BEHAVIOR_TRIGGER_ONCE = 'trigger_once';
export const ITEM_BEHAVIOR_TRIGGER_MULTIPLE = 'trigger_mult';
export const ITEM_BEHAVIOR_TOGGLE = 'toggle';

export const ITEM_TRIGGER_MIDI_CC = 'midi_cc';
export const ITEM_TRIGGER_MIDI_NOTE = 'midi_note';
export const ITEM_TRIGGER_OSC_ADR_ARG = 'osc_adr_arg';

export const ITEM_LABELS = {
  [ITEM_BEHAVIOR_TRIGGER_ONCE]: 'Trigger once',
  [ITEM_BEHAVIOR_TRIGGER_MULTIPLE]: 'Trigger multiple',
  [ITEM_BEHAVIOR_TOGGLE]: 'Toggle',

  [ITEM_TRIGGER_MIDI_CC]: 'MIDI CC value 0/127',
  [ITEM_TRIGGER_MIDI_NOTE]: 'MIDI note on/off',
  [ITEM_TRIGGER_OSC_ADR_ARG]: 'OSC argument 1',
};
