import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "@/router/index";
import store from "@/store/index";
import AuthProvider from "@/provider/auth";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useEffect, useReducer } from "react";
import { useCanvas } from "./store/modules/hook";
import { CanvasContext } from "./utils/context";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let persistor = persistStore(store);

function App() {
  const canvas = useCanvas() as any;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = canvas.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <CanvasContext.Provider value={canvas}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={darkTheme}>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </ThemeProvider>
        </PersistGate>
      </CanvasContext.Provider>
    </Provider>
  );
}

export default App;
