import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    defaultCanvas: {
      title: "未命名",
      style: {
        width: 997,
        height: 561,
        backgroundColor: "#000000",
        backgroundImage: "",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      cmps: [],
    },
  },
  reducers: {
    changeCanvasWidthAndHeightAction(state, { payload }) {
      state.defaultCanvas.style.width = payload.width;
      state.defaultCanvas.style.height = payload.height;
    },
  },
});

export const { changeCanvasWidthAndHeightAction } = canvasSlice.actions;
export default canvasSlice.reducer;
