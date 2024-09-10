import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentProjectFileState = string | undefined;

const initialState = undefined satisfies CurrentProjectFileState as CurrentProjectFileState;

const slice = createSlice({
  name: 'currentProjectFile',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
    clear: (state) => {
      state = undefined;
    },
  }
})

export const {
  set,
  clear,
} = slice.actions

export default slice.reducer
