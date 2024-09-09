import { app } from "electron";
import { join } from "path";
import { BrowserWindow } from "electron/main";

import { envIsDev } from "./lib/env";

console.group('KODTROL env vars');
console.info('is dev:', envIsDev);
console.groupEnd();

app.whenReady().then(() => {
  console.log("app ready");

  const engineWindow = new BrowserWindow({
    show: envIsDev,
  });
  engineWindow.webContents.session.setPermissionCheckHandler(() => true);
  engineWindow.webContents.session.setDevicePermissionHandler(() => true);
  engineWindow.webContents.loadFile(join(__dirname, "..", "engine", "engine.html"));
  envIsDev && engineWindow.webContents.openDevTools();
});
