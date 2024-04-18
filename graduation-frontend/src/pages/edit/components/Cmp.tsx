import type { FC, ReactNode } from "react";
import React, { useContext } from "react";
import { CanvasContext } from "@/utils/context";
import Line from "./Line";
import Texts from "./Text";
import { isTextComponent } from "@/utils";

interface IProps {
  children?: ReactNode;
  index: number;
  cmp: any;
}

const Cmp: FC<IProps> = ({ index, cmp }) => {
  const canvasContext = useContext(CanvasContext);

  const setSelected = (e) => {
    if (e.ctrlKey) {
      canvasContext.addAndUpdateAssembly(index);
    } else {
      canvasContext.setSelectedCmpIndex(index);
    }
  };

  const { style } = cmp;
  const { width, height } = style;
  const transform = `rotate(${style.transform}deg)`;

  const zIndex = index;

  const belongingToAssembly = canvasContext.belongingToAssembly(index);

  return (
    <div
      id={cmp.key}
      className="absolute"
      style={{
        ...style,
        transform,
        zIndex,
      }}
      onClick={setSelected}
    >
      {belongingToAssembly && <Line style={{ width, height, transform }} />}

      <div
        className="whitespace-break-spaces overflow-hidden"
        style={{
          width: style.width,
          height: style.height,
        }}
      >
        {cmp.type === isTextComponent && <Texts {...cmp} />}{" "}
        {/* {cmp.type === isImageComponent && <Image {...cmp} />} */}
      </div>
    </div>
  );
};

export default Cmp;
