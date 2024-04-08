import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "@/router/index";
import store from "@/store/index";
import AuthProvider from "@/provider/auth";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
