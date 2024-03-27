import NotFound from "@/pages/not_found";
import Register from "@/pages/register";
import WorkSpace from "@/pages/workspace";
import Copilot from "@/pages/workspace/components/copilot";
import WorkspaceHome from "@/pages/workspace/components/home";
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
    children: [
      {
        path: "/workspace/home",
        element: <WorkspaceHome />,
      },
      {
        path: "/workspace/copilot",
        element: <Copilot />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
