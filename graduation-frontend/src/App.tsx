import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "@/router/index";
import store from "@/store/index";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
