import UsageItem from "@/components/item";
import { useAppSelector } from "@/store/storeHook";
import type { FC, ReactNode } from "react";
import { shallowEqual } from "react-redux";

interface IProps {
  children?: ReactNode;
}

const Usage: FC<IProps> = () => {
  const { user } = useAppSelector(
    (state) => ({
      user: state.user.userInfo,
    }),
    shallowEqual
  );

  const generateCount =
    user[0].roles[0].name === 0
      ? user[0].limit.standardGenerateLimit
      : user[0].limit.standardGenerateLimit;

  const exportCount =
    user[0].roles[0].name === 0
      ? user[0].limit.standardExportLimit
      : user[0].limit.plusExportLimit;

  return (
    <div className="flex flex-col items-start gap-4">
      <span className="text-[20px] text-semibold">使用汇总</span>
      <span className="text-semibold text-sm text-[#666]">
        当前计划为
        {user[0].roles[0].name === 0 ? "「Lico-AI Free」" : "「Lico-AI Plus」"}
      </span>
      <div className="flex flex-row justify-start items-center gap-4">
        <UsageItem
          name="生成数"
          description="总生成数"
          totalCount={generateCount}
        />
        <UsageItem
          name="导出数"
          description="总导出数"
          totalCount={exportCount}
        />
      </div>
    </div>
  );
};

export default Usage;
