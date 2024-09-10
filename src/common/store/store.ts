import { configureStore } from "@reduxjs/toolkit";

import currentProjectFile from "./slices/currentProjectFile";

export const store = configureStore({
  reducer: {
    currentProjectFile,
  }
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
