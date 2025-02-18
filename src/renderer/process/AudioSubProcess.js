import { spawn } from 'child_process';
import electron from 'electron';
import { join } from 'path';
import EventEmitter from 'events';

export default class AudioSubProcess extends EventEmitter {
  _childProcess = null;

  constructor() {
    super();

    const processPath = join(__dirname, 'process', 'audio', 'kodtrol-audio.js');

    this._childProcess = spawn(electron, [
      processPath,
    ], {
      stdio: ['ipc', 'pipe', 'inherit'],
      env: {
        KODTROL_DEV: process.env['KODTROL_DEV'],
      },
    });
    this._childProcess.stdout.setEncoding('utf8');
    this._childProcess.stdout.on('data', this._onData.bind(this));
  }

  _onData(chunk) {
    if (chunk === 'ready') {
      this.emit('ready');
    }
  }

  send(data) {
    if (this._childProcess) {
      if (!this._childProcess.connected) {
        console.error('Audio subprocess not connected!');
        return;
      }

      this._childProcess.send(data);
    }
  }

  destroy() {
    if (this._childProcess) {
      this._childProcess.stdout.removeAllListeners();
      this._childProcess.kill();
    }
    this._childProcess = null;
  }
}
