import { useCanvasByContext } from "@/store/modules/hook";
import { defaultCommonStyle, isImageComponent } from "@/utils";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const defaultStyle = {
  ...defaultCommonStyle,
};

const settings = [
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/hove.webp",
    style: defaultStyle,
  },
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/new.webp",
    style: defaultStyle,
  },
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/birk.webp",
    style: defaultStyle,
  },
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/cardiff.webp",
    style: defaultStyle,
  },
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/york.webp",
    style: defaultStyle,
  },
  {
    value:
      "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/livepool.webp",
    style: defaultStyle,
  },
];

const arithmetic = ["fairytale.webp"];

arithmetic.forEach((item) => {
  settings.push({
    value: `https://commom.pek3b.qingstor.com/all/arithmetic/${
      item.indexOf(".") > 0 ? item : item + ".png"
    }`,
    style: defaultStyle,
  });
});

const EditElement: FC<IProps> = () => {
  const canvas = useCanvasByContext();

  const addCmp = (_cmp) => {
    canvas.addCmps(_cmp);
  };

  const onDragStart = (e, _cmp) => {
    e.dataTransfer.setData("data-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">添加元素</span>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-normal">图片</h4>
        </div>

        <div className="z-[999] top-0 left-[80px] h-full py-[10px] px-[14px] shadow-lg bg-[#ffffff]">
          <ul className="w-full flex flex-row flex-wrap gap-3">
            {settings.map((item) => (
              <li
                key={item.value}
                onClick={() => addCmp({ ...item, type: isImageComponent })}
                className="inline-block w-[120px] h-[120px] leading-[120px] overflow-hidden mt-[10px] border-[1px] border-[#ddd] text-center"
                onDragStart={(e) =>
                  onDragStart(e, { ...item.style, type: isImageComponent })
                }
              >
                <img src={item.value} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditElement;
