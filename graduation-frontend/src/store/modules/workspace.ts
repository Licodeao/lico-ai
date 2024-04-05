import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    dialogOpen: false,
  },
  reducers: {
    changeDialogOpenAciton(state, { payload }) {
      state.dialogOpen = payload;
    },
  },
});

export const { changeDialogOpenAciton } = workspaceSlice.actions;
export default workspaceSlice.reducer;
