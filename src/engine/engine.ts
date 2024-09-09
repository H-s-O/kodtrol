const listWebSerialPorts = () => {
  navigator.serial.getPorts().then((ports) => {
    console.group('serial ports');
    ports.forEach((port) => console.log(port.getInfo()));
    console.groupEnd();
  });
};

const listWebUsbDevices = () => {
  navigator.usb.getDevices().then((devices) => {
    console.group('usb devices');
    devices.forEach((device) => console.log(device.productName));
    console.groupEnd();
  });
};

setInterval(listWebSerialPorts, 2000);
setInterval(listWebUsbDevices, 2000);
