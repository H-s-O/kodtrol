import _camelCase from 'lodash/camelCase';
import _upperFirst from 'lodash/upperFirst';

export default class Device {
  _id = null;
  _name = null;
  _type = null;
  _groups = [];
  _startingChannel = null;
  _channelAliases = {};
  _channelDefaults = {};
  _channels = {};
  _output = null;
  _providers = null;
  _hash = null;
  
  constructor(providers, sourceDevice) {
    this._providers = providers;
    
    this.update(sourceDevice);
  }
  
  update = (sourceDevice) => {
    const {
      id,
      name,
      type,
      groups,
      channels,
      startChannel,
      output,
      hash,
    } = sourceDevice;

    this._id = id;
    this._name = name;
    this._type = type;
    this._startingChannel = Number(startChannel);
    this._hash = hash;
    
    this.setOutput(output);
    this.setGroups(groups);
    this.setChannelAliases(channels);
    this.setDefaultValues(channels);
    this.setChannelGettersAndSetters(channels);
  }
  
  setOutput = (outputId) => {
    // Guard
    if (!outputId) {
      this._output = null;
      return;
    }
    this._output = this._providers.getOutput(outputId);
  }
  
  setGroups = (groups) => {
    if (typeof groups === 'string') { // backward compat
      this._groups = groups.split(',');
      return;
    }
    this._groups = groups;
  }
  
  setChannelAliases = (channels) => {
    // Guard
    if (!channels) {
      this._channelAliases = {};
      return;
    }
    this._channelAliases = channels.reduce((obj, {alias}, index) => {
      if (alias) {
        return {
          ...obj,
          [alias]: index,
        };
      }
      return obj;
    }, {});
  }
  
  setDefaultValues = (channels) => {
    // Guard
    if (!channels) {
      this._channelDefaults = [];
      return;
    }
    this._channelDefaults = channels.map(({defaultValue}) => Number(defaultValue));
  }
  
  setChannelGettersAndSetters = (channels) => {
    if (channels) {
      channels.forEach(({alias}) => {
        if (alias) {
          const aliasMethodName = _upperFirst(_camelCase(alias));
          this[`get${aliasMethodName}`] = () => {
            return this.getChannel(alias);
          };
          this[`set${aliasMethodName}`] = (value) => {
            this.setChannel(alias, value);
            return this;
          };
        }
      });
    }
  }

  get id() {
    return this._id;
  }
  
  get startingChannel() {
    return this._startingChannel;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
  
  get channelDefaults() {
    return this._channelDefaults;
  }
  
  get channelAliases() {
    return this._channelAliases;
  }

  get channels() {
    return this._channels;
  }
  
  get hash() {
    return this._hash;
  }
  
  resetChannels = () => {
    this._channels = {
      ...this._channelDefaults,
    };
  }
  
  sendDataToOutput = () => {
    if (this._output) {
      const data = Object.entries(this._channels).reduce((obj, [channel, channelValue]) => {
        return {
          ...obj,
          [this._startingChannel + Number(channel)]: channelValue,
        };
      }, {});
      
      this._output.buffer(data);
    }
  }
  
  is = (type) => {
    return this._type === type;
  }
  
  hasGroup = (group) => {
    return this._groups.indexOf(group) !== -1;
  }
  
  getChannelDefault = (channel) => {
    if (typeof channel === 'string') {
      channel = this._channelAliases[channel];
    }
    return this._channelDefaults[channel] || 0;
  }

  getChannel = (channel) => {
    if (typeof channel === 'string') {
      channel = this._channelAliases[channel];
    }
    return this._channels[channel] || 0;
  }

  setChannel = (channel, value) => {
    if (typeof channel === 'string') {
      channel = this._channelAliases[channel];
    }
    this._channels[channel] = value;
    return value;
  }

  updateChannel = (channel, func) => {
    return this.setChannel(channel, func(this.getChannel(channel)));
  }
  
  destroy = () => {
    this._id = null;
    this._name = null;
    this._type = null;
    this._groups = null;
    this._startingChannel = null;
    this._channelAliases = null;
    this._channelDefaults = null;
    this._channels = null;
    this._output = null;
    this._providers = null;
    this._hash = null;
  }
};
