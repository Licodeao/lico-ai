import NotFound from "@/pages/not_found";
import Register from "@/pages/register";
import { Navigate, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signup" />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
