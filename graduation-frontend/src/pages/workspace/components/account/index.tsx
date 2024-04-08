import type { FC, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Account: FC<IProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-row items-center">
      <div className="h-full text-[#7E7E7E] flex flex-col justify-start items-center gap-12 mt-9">
        <div
          className="p-2 px-5 rounded-lg hover:bg-[#2D2F2F]"
          onClick={() => navigate("/workspace/account/settings")}
        >
          空间设置
        </div>
        <div
          className="p-2 px-5 rounded-lg hover:bg-[#2D2F2F]"
          onClick={() => navigate("/workspace/account/subscription")}
        >
          订阅计划
        </div>
        <div
          className="p-2 px-5 rounded-lg hover:bg-[#2D2F2F]"
          onClick={() => navigate("/workspace/account/usage")}
        >
          使用汇总
        </div>
        <div
          className="p-2 px-5 rounded-lg hover:bg-[#2D2F2F]"
          onClick={() => navigate("/workspace/account/profile")}
        >
          个人信息
        </div>
      </div>
      <div className="flex-1 h-full m-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
