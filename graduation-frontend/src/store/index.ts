import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/home";
import canvasReducer from "./modules/canvas";
import workspaceReducer from "./modules/workspace";
import mediaReducer from "./modules/media";
import userReducer from "./modules/user";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  home: homeReducer,
  canvas: canvasReducer,
  workspace: workspaceReducer,
  media: mediaReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
