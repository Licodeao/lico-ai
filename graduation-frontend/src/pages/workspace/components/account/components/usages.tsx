import UsageItem from "@/components/item";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Usage: FC<IProps> = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="text-[20px] text-semibold">使用汇总</span>

      <div className="flex flex-row justify-start items-center gap-4">
        <UsageItem name="生成数" description="总生成数" totalCount={5} />
        <UsageItem name="导出数" description="总导出数" totalCount={4} />
      </div>
    </div>
  );
};

export default Usage;
