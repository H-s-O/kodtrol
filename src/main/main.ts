import { app } from "electron";
import { join } from "path";
import { BrowserWindow } from "electron/main";
import { createWithPort } from "@bucky24/redux-websocket/server";
import { ReduxWebSocketClient } from "@bucky24/redux-websocket";

import { envIsDev, envUiPort, envWsPort } from "./lib/env";
import { APP_NAME, DEFAULT_WS_PORT } from "../common/constants";
import { AppStore } from "../common/store/store";

console.group('KODTROL env vars');
console.info('is dev:', envIsDev);
console.info('ws port:', envWsPort);
console.info('ui port:', envUiPort);
console.groupEnd();

app.whenReady().then(() => {
  console.log("app ready");

  let store: AppStore;

  const wsPort = envWsPort ?? DEFAULT_WS_PORT;
  const wsUrl = `ws://localhost:${wsPort}`;
  const reduxWsServer = createWithPort(wsPort);

  const socketHandler = new ReduxWebSocketClient(wsUrl, 'kodtrol');
  socketHandler.on('stateReceived', ({initialS}))

  const engineWindow = new BrowserWindow({
    title: `${APP_NAME} - Engine`,
    show: envIsDev,
  });
  engineWindow.webContents.session.setPermissionCheckHandler(() => true);
  engineWindow.webContents.session.setDevicePermissionHandler(() => true);
  engineWindow.webContents.loadFile(join(__dirname, "..", "engine", "engine.html"));
  if (envIsDev) engineWindow.webContents.openDevTools();
});
