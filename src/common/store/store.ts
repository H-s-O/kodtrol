import { configureStore, Middleware } from "@reduxjs/toolkit";

import currentProjectFile from "./slices/currentProjectFile";

export const createKodtrolStore = (preloadedState = {}, extraMiddlewares: Middleware[] = []) => configureStore({
  preloadedState,
  reducer: {
    currentProjectFile,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extraMiddlewares),
});

export type AppStore = ReturnType<typeof createKodtrolStore>;
export type RootState = ReturnType<ReturnType<typeof createKodtrolStore>['getState']>;
export type AppDispatch = ReturnType<typeof createKodtrolStore>['dispatch'];
