import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/home";
import canvasReducer from "./modules/canvas";
import workspaceReducer from "./modules/workspace";

const store = configureStore({
  reducer: {
    home: homeReducer,
    canvas: canvasReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
