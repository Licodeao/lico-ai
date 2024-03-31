import { getHomeData } from "@/service/modules/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    currentIndex: 0,
  },
  reducers: {
    changeCurrentIndexAction(state, { payload }) {
      state.currentIndex = payload;
    },
  },
});

export const fetchHomeDataAction = createAsyncThunk(
  "fetchHomeDataAction",
  async () => {
    const res = await getHomeData();
    return res.data;
  }
);

export const { changeCurrentIndexAction } = homeSlice.actions;
export default homeSlice.reducer;
