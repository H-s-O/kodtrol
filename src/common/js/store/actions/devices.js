import uniqid from 'uniqid';

import { hashDataObject } from '../../lib/hash';

const excludeHashProps = [
  'id',
  'name',
];

export const UPDATE_DEVICES = 'update_devices';
export const updateDevicesAction = (devices) => {
  return {
    type: UPDATE_DEVICES,
    payload: devices,
  };
};

export const CREATE_DEVICE = 'create_device';
export const createDeviceAction = (data) => {
  const newData = {
    ...data,
    id: uniqid(),
  }
  return {
    type: CREATE_DEVICE,
    payload: {
      ...newData,
      hash: hashDataObject(newData, excludeHashProps),
    },
  };
};

export const DELETE_DEVICE = 'delete_device';
export const deleteDeviceAction = (id) => {
  return {
    type: DELETE_DEVICE,
    payload: id,
  };
};

export const SAVE_DEVICE = 'save_device';
export const saveDeviceAction = (id, data) => {
  return {
    type: SAVE_DEVICE,
    payload: {
      id,
      data: {
        ...data,
        hash: hashDataObject(data, excludeHashProps),
      },
    },
  };
};

export const CREATE_DEVICE_FOLDER = 'create_device_folder';
export const createDeviceFolderAction = (data) => {
  const newData = {
    ...data,
    id: uniqid(),
  }
  return {
    type: CREATE_DEVICE_FOLDER,
    payload: {
      ...newData,
      hash: hashDataObject(newData, excludeHashProps),
    },
  };
}

export const DELETE_DEVICE_FOLDER = 'delete_device_folder';
export const deleteDeviceFolderAction = (id) => {
  return {
    type: DELETE_DEVICE_FOLDER,
    payload: id,
  };
}
