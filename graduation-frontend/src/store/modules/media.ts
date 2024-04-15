import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MediaItemType {
  name: string;
  type: string;
  size: number;
  imageUrl: string;
}
interface MediaType {
  albumsList: string[];
  mediaList: MediaItemType[];
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
    changeMediaListAction(state, { payload }) {
      state.mediaList.push(payload);
    },
  },
});

export const { changeAlbumsListAction, changeMediaListAction } =
  mediaSlice.actions;
export default mediaSlice.reducer;
