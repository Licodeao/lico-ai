import { CanvasContext } from "@/utils/context";
import { useContext, type FC, type ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  zoom: any;
  style: any;
}

const StretchDots: FC<IProps> = ({ zoom, style }) => {
  const canvasContext = useContext(CanvasContext);

  const onMouseDown = (e) => {
    const direction = e.target.dataset.direction;
    if (!direction) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      let newStyle = {} as any;

      if (direction) {
        if (direction.indexOf("top") >= 0) {
          disY = 0 - disY;
          newStyle.top = -disY;
        }
        if (direction.indexOf("left") >= 0) {
          disX = 0 - disX;
          newStyle.left = -disX;
        }
      }

      Object.assign(newStyle, {
        width: disX,
        height: disY,
      });

      canvasContext.updateAssemblyCmps(newStyle);

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      canvasContext.recordCanvasChangeHistory();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const { width, height, transform } = style;

  return (
    <>
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: -6,
          left: -6,
          transform,
          cursor: "nwse-resize",
        }}
        data-direction="top, left"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: -6,
          left: width / 2 - 6,
          transform,
          cursor: "row-resize",
        }}
        data-direction="top"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: -6,
          left: width - 4,
          transform,
          cursor: "nesw-resize",
        }}
        data-direction="top, right"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: height / 2 - 10,
          left: width - 3,
          width: "8px",
          height: "18px",
          borderRadius: "25%",
          transform,
          cursor: "col-resize",
        }}
        data-direction="right"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: height - 6,
          left: width - 4,
          transform,
          cursor: "nwse-resize",
        }}
        data-direction="bottom, right"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: height - 4,
          left: width / 2 - 6,
          transform,
          cursor: "row-resize",
        }}
        data-direction="bottom"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: height - 6,
          left: -6,
          transform,
          cursor: "nesw-resize",
        }}
        data-direction="bottom, left"
        onMouseDown={onMouseDown}
      />
      <div
        className="z-[9999] absolute w-[10px] h-[10px] bg-[#fff] border-[1px] border-[#0057ff] rounded-[50%]"
        style={{
          top: height / 2 - 10,
          left: -5,
          width: "8px",
          height: "18px",
          borderRadius: "25%",
          transform,
          cursor: "col-resize",
        }}
        data-direction="left"
        onMouseDown={onMouseDown}
      />
    </>
  );
};

export default StretchDots;
