import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MediaType {
  albumsList: string[];
}

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    albumsList: [],
  } as MediaType,
  reducers: {
    changeAlbumsListAction(state, action: PayloadAction<any>) {
      state.albumsList.push(action.payload);
    },
  },
});

export const { changeAlbumsListAction } = mediaSlice.actions;
export default mediaSlice.reducer;
