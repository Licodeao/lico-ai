import Edit from "@/pages/edit";
import EditAudio from "@/pages/edit/views/audio";
import EditElement from "@/pages/edit/views/element";
import EditFilter from "@/pages/edit/views/filter";
import EditMedia from "@/pages/edit/views/media";
import EditRecord from "@/pages/edit/views/record";
import EditSetting from "@/pages/edit/views/setting";
import EditText from "@/pages/edit/views/text";
import NotFound from "@/pages/not_found";
import Register from "@/pages/register";
import WorkSpace from "@/pages/workspace";
import Account from "@/pages/workspace/components/account";
import Usage from "@/pages/workspace/components/account/components/usages";
import Profile from "@/pages/workspace/components/account/components/profile";
import AccountSetting from "@/pages/workspace/components/account/components/settings";
import Subscribe from "@/pages/workspace/components/account/components/subscribe";
import Copilot from "@/pages/workspace/components/copilot";
import WorkspaceHome from "@/pages/workspace/components/home";
import Media from "@/pages/workspace/components/media";
import Albums from "@/pages/workspace/components/media/components/albums";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AlbumContent from "@/pages/workspace/components/media/components/albumContent";

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
      {
        path: "/workspace/media",
        element: <Media />,
        children: [
          {
            path: "/workspace/media/albums",
            element: <Albums />,
          },
          {
            path: "/workspace/media/album/:album",
            element: <AlbumContent />,
          },
        ],
      },
      {
        path: "/workspace/account",
        element: <Account />,
        children: [
          {
            path: "/workspace/account/settings",
            element: <AccountSetting />,
          },
          {
            path: "/workspace/account/subscription",
            element: <Subscribe />,
          },
          {
            path: "/workspace/account/usage",
            element: <Usage />,
          },
          {
            path: "/workspace/account/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/edit",
    element: <Edit />,
    children: [
      {
        path: "/edit/setting",
        element: <EditSetting />,
      },
      {
        path: "/edit/media",
        element: <EditMedia />,
      },
      {
        path: "/edit/audio",
        element: <EditAudio />,
      },
      {
        path: "/edit/text",
        element: <EditText />,
      },
      {
        path: "/edit/element",
        element: <EditElement />,
      },
      {
        path: "/edit/record",
        element: <EditRecord />,
      },
      {
        path: "/edit/filter",
        element: <EditFilter />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
