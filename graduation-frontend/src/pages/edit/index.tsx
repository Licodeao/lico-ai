import { useEffect, type FC, type ReactNode } from "react";
import Nav from "./components/nav";
import Ffmpeg from "./components/ffmpeg";
import Operator from "./components/operator";
import Canvas from "./components/canvas";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Edit: FC<IProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/edit" ||
      window.location.pathname === "/edit/"
    ) {
      navigate("/edit/setting", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-row items-center text-[#5C5E65]">
      <Nav />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 flex">
          <Operator />
          <Canvas />
        </div>
        <Ffmpeg />
      </div>
    </div>
  );
};

export default Edit;
