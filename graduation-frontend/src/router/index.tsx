import NotFound from "@/pages/not_found";
import Register from "@/pages/register";
import WorkSpace from "@/pages/workspace";
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
    path: "/workspace",
    element: <WorkSpace />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
