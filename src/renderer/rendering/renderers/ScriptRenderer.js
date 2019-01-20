export default class ScriptRenderer {
  _rendererType = 'script';
  _providers = null;
  _script = null;
  _devices = null;
  _standalone = true;
  _setuped = false;
  _started = false;
  _localBeat = 0;
  _scriptData = {};
  
  constructor(providers, scriptId, standalone = true) {
    this._providers = providers;
    this._standalone = standalone;
    
    this.setScriptAndDevices(scriptId);
  }
  
  setScriptAndDevices = (scriptId) => {
    this._script = this._providers.getScript(scriptId);
    this._devices = this._providers.getDevices(this._script.devices);
  }
  
  reset = () => {
    Object.values(this._devices).forEach((device) => {
      // device.resetChannels();
      device.resetVars();
    });
    
    this._scriptData = {};
    this._setuped = false;
    this._started = false;
    this._localBeat = 0;
  }
  
  get rendererType() {
    return this._rendererType;
  }
  
  get script() {
    return this._script;
  }
  
  render = (delta, blockInfo = {}, triggerData = {}, curveData = {}) => {
    const script = this._script;
           
    // Standalone setup
    if (this._standalone) {
      if (script.hasSetup && !this._setuped) {
        try {
          const data = script.scriptInstance.setup(this._devices, this._scriptData);
          if (data) {
            this._scriptData = data;
          }
        } catch (err) {
          console.error(err);
        }
        this._setuped = true;
      }
    }
    // In-timeline setup
    else {
      // If in setup period
      const early = blockInfo.blockPercent < 0;
      // If has setup
      if (script.hasSetup && (early || !this._setuped)) {
        try {
          const data = script.scriptInstance.setup(this._devices, this._scriptData);
          if (data) {
            this._scriptData = data;
          }
        } catch (err) {
          console.error(err);
        }
        this._setuped = true;
        if (early) {
          return;
        }
      } 
      // Has no setup, but we need to stop early
      else if (!script.hasSetup && early) {
        return;
      }
    }
  
    // Start
    if (!this._started) {
      if (script.hasStart) {
        try {
          const data = script.scriptInstance.start(this._devices, this._scriptData, triggerData, curveData);
          if (data) {
            this._scriptData = data;
          }
        } catch (err) {
          console.error(err);
        }
      }
      this._started = true;
    }

    // Loop
    if (script.hasLoop) {
      try {
        const data = script.scriptInstance.loop(this._devices, this._scriptData, blockInfo, triggerData, curveData);
        if (data) {
          this._scriptData = data;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  beat = (beat, delta) => {
    this._localBeat++;
    
    // Beat
    if (this._script.hasBeat) {
      const beatObject = {
        localBeat: this._localBeat,
        globalBeat: beat,
      };
      try {
        const data = this._script.scriptInstance.beat(this._devices, beatObject, this._scriptData);
        if (data) {
          this._scriptData = data;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  input = (type, inputData) => {
    // Input
    if (this._script.hasInput) {
      try {
        const data = this._script.scriptInstance.input(this._devices, type, inputData, this._scriptData);
        if (data) {
          this._scriptData = data;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  destroy = () => {
    this._script = null;
    this._devices = null;
    this._scriptData = null;
  }
}
