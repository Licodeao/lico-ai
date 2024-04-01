import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    defaultCanvas: {
      title: "未命名",
      style: {
        width: 858,
        height: 482,
        backgroundColor: "#000000",
        backgroundImage: "",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      cmps: [],
    },
  },
  reducers: {},
});

export default canvasSlice.reducer;
