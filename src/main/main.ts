import { app } from "electron";
import { join } from "path";
import { BrowserWindow } from "electron/main";
import { createWithPort } from "@bucky24/redux-websocket/server";
import { ReduxWebSocketClient } from "@bucky24/redux-websocket";
import WebSocket from "ws";
import { randomUUID } from "crypto";

import { envIsDev, envUiPort, envWsPort } from "./lib/env";
import { APP_NAME, DEFAULT_WS_PORT } from "../common/constants";
import { AppStore, createKodtrolStore } from "../common/store/store";

// homemade polyfill
(global as any).WebSocket = WebSocket

console.group('KODTROL env vars');
console.info('is dev:', envIsDev);
console.info('ws port:', envWsPort);
console.info('ui port:', envUiPort);
console.groupEnd();

app.whenReady()
  .then(() => {
    console.log("KODTROL app ready");

    const wsPort = envWsPort ?? DEFAULT_WS_PORT;
    const wsUrl = `ws://localhost:${wsPort}`;
    const wsProtocol = "protocol";
    const wsSession = randomUUID();

    const reduxWsServer = createWithPort(wsPort);

    let store: AppStore;

    const reduxMainClient = new ReduxWebSocketClient(wsUrl, wsProtocol);
    reduxMainClient.setAuthentication(wsSession);
    reduxMainClient.on('stateReceived', ({ initialState }) => {
      console.log('allo');
      store = createKodtrolStore(initialState, [reduxMainClient.getMiddleware()]);
      console.log(store.getState());
      return store;
    });


    const engineWindow = new BrowserWindow({
      title: `${APP_NAME} - Engine`,
      show: envIsDev,
      webPreferences: {
        preload: join(__dirname, "..", "engine", "engine-preload.js"),
        additionalArguments: [
          `--kodtrol=${JSON.stringify({
            wsSession,
          })}`,
        ],
      }
    });
    engineWindow.webContents.session.setPermissionCheckHandler(() => true);
    engineWindow.webContents.session.setDevicePermissionHandler(() => true);
    engineWindow.webContents.loadFile(join(__dirname, "..", "engine", "engine.html"));
    if (envIsDev) engineWindow.webContents.openDevTools();
  })
  .catch((err) => {
    console.error('---------------------------------');
    console.error('KODTROL main error:');
    console.error(err);
    process.exit(1);
  });
