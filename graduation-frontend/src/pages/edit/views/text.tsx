import { useCanvasByContext } from "@/store/modules/hook";
import { defaultCommonStyle, isTextComponent } from "@/utils";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const EditText: FC<IProps> = () => {
  const canvas = useCanvasByContext();

  const defaultStyle = {
    ...defaultCommonStyle,
    width: 170,
    height: 30,
    lineHeight: "30px",
    fontSize: 12,
    fontWeight: "normal",
    color: "#000",
    backgroundColor: "#ffffff00",
    textAlign: "left",
    wordSpacing: "10px",
  };

  const settings = [
    {
      value: "双击编辑标题",
      style: {
        ...defaultStyle,
        fontSize: 28,
        height: 50,
        lineHeight: "50px",
      },
    },
    {
      value: "双击编辑正文",
      style: defaultStyle,
    },
  ];

  const addCmp = (_cmp) => {
    canvas.addCmps(_cmp);
  };

  const onDragStart = (e, _cmp) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">添加文本</span>
      <div className="grid grid-cols-2 grid-rows-3 gap-y-5.5rem gap-4">
        <ul className="w-[254px] flex flex-row flex-wrap gap-3">
          {settings.map((item) => {
            return (
              <li
                key={item.value}
                className="inline-block w-[120px] h-[120]px overflow-hidden my-[10px] border-[1px] border-[#ddd] text-center p-2"
                draggable
                onClick={() =>
                  addCmp({ ...item, value: item.value, type: isTextComponent })
                }
                onDragStart={(e) =>
                  onDragStart(e, { ...item, type: isTextComponent })
                }
              >
                {item.value.indexOf("双击编辑") > -1
                  ? item.value.slice(4)
                  : item.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EditText;
