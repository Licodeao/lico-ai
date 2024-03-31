import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const EditText: FC<IProps> = () => {
  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">添加文本</span>
      <div className="grid grid-cols-2 grid-rows-3 gap-y-5.5rem gap-4">
        <div
          className="bg-[#F7F7F8] w-full h-[88px] col-span-2 flex justify-center items-center rounded-xl"
          draggable
        >
          标题
        </div>
        <div
          className="bg-[#F7F7F8] col-span-1 flex justify-center items-center rounded-xl"
          draggable
        >
          其他字体文本
        </div>
        <div
          className="bg-[#F7F7F8] col-span-1 flex justify-center items-center rounded-xl"
          draggable
        >
          其他字体文本
        </div>
      </div>
    </div>
  );
};

export default EditText;
