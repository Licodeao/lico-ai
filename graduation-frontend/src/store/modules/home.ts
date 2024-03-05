import { getHomeData } from "@/service/modules/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    s: "Hello World",
  },
  reducers: {
    changeHomeDataAction: (state, { payload }) => {
      state.s = payload;
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

export const { changeHomeDataAction } = homeSlice.actions;
export default homeSlice.reducer;
