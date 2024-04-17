import { useAppSelector } from "@/store/storeHook";
import { Button } from "@mui/material";
import type { FC, ReactNode } from "react";
import { shallowEqual } from "react-redux";

interface IProps {
  children?: ReactNode;
}

const Subscribe: FC<IProps> = () => {
  const { user } = useAppSelector(
    (state) => ({
      user: state.user.userInfo,
    }),
    shallowEqual
  );

  return (
    <div className="flex flex-col items-start gap-5">
      <span className="text-[20px] text-semibold">订阅计划</span>

      <span className="text-md">当前订阅</span>

      <div className="flex flex-row justify-between items-center w-[600px] h-[100px] bg-[#2D2F2F] rounded-lg px-3">
        <div className="flex flex-col items-start gap-2">
          <span className="text-semibold text-md">
            Lico AI {user[0].roles[0].name === 0 ? "Free" : "Plus"}
          </span>
          <span className="text-[#8B8B8D] text-sm">
            升级你的计划以便获得更多权限去创作, 更多的导出次数和其他更多权益
          </span>
        </div>

        <Button type="submit" variant="contained">
          升级订阅
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
