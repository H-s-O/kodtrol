import { readJsonSync, writeJsonSync, ensureFileSync, ensureDirSync, writeFileSync } from 'fs-extra';
import { app } from 'electron';
import path from 'path';
import { get } from 'lodash';

export {
  writeFileSync as writeFile,
};

export const getAppConfigPath = () => {
  const userData = app.getPath('userData');
  const configPath = path.join(userData, 'Config');
  return configPath;
}

export const getCompiledScriptsDir = () => {
  return path.join(app.getPath('userData'), 'scripts_compiled');
}

export const getCompiledScriptPath = (scriptId) => {
  return path.join(getCompiledScriptsDir(), `/${scriptId}.js`);
}

export const getConvertedAudiosDir = () => {
  return path.join(app.getPath('userData'), 'audios_converted');
}

export const ensureFile = (path) => {
  return ensureFileSync(path);
};

export const ensureDir = (path) => {
  return ensureDirSync(path);
};

export const readJson = (path, data) => {
  return readJsonSync(path);
};

export const writeJson = (path, data) => {
  writeJsonSync(path, data);
};

export const readAppConfig = (path) => {
  const configPath = getAppConfigPath();
  try {
    const config = readJson(configPath);
    if (typeof path !== 'undefined') {
      return get(config, path);
    }
    return config;
  } catch (err) {
    if (typeof path !== 'undefined') {
      return null;
    }
    return {};
  }
}

export const writeAppConfig = (data) => {
  const configPath = getAppConfigPath();
  writeJson(configPath, data);
}

