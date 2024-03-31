import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const EditElement: FC<IProps> = () => {
  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">添加元素</span>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-normal">Emoji</h4>
          <span className="text-xs text-[#9194A5] font-normal hover:text-[#72C1FD]">
            查看更多
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditElement;
