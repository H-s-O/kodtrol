import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentProjectFileState = string | null;

const initialState = null satisfies CurrentProjectFileState as CurrentProjectFileState;

const slice = createSlice({
  name: 'currentProjectFile',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
    clear: (state) => {
      state = null;
    },
  }
})

export const {
  set,
  clear,
} = slice.actions

export default slice.reducer
