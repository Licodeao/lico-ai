import { useEffect, type FC, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import WorkSpaceHeader from "./components/header";

interface IProps {
  children?: ReactNode;
}

const WorkSpace: FC<IProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/workspace" ||
      window.location.pathname === "/workspace/"
    ) {
      navigate("/workspace/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen text-white flex justify-center items-center flex-col bg-[#141414]">
      <WorkSpaceHeader />
      <div className="w-screen h-screen flex-6 py-4 px-8 flex flex-col gap-14 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default WorkSpace;
