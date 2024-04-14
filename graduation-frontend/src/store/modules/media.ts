import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MediaType {
  albumsList: string[];
  mediaList: any[];
}

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    albumsList: [],
    mediaList: [],
  } as MediaType,
  reducers: {
    changeAlbumsListAction(state, action: PayloadAction<any>) {
      state.albumsList.push(action.payload);
    },
    changeMediaListAction(state, action) {
      state.mediaList.push(action.payload);
    },
  },
});

export const { changeAlbumsListAction, changeMediaListAction } =
  mediaSlice.actions;
export default mediaSlice.reducer;
