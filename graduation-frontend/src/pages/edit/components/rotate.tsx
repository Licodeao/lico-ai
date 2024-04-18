import { CanvasContext } from "@/utils/context";
import { useContext, type FC, type ReactNode } from "react";
import rotateSvg from "@/assets/img/rotate.svg";

interface IProps {
  children?: ReactNode;
  zoom: any;
  style: any;
}

const Rotate: FC<IProps> = ({ zoom, style }) => {
  const canvasContext = useContext(CanvasContext);

  const rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const cmp = canvasContext.getSelectedCmp();
    const { style } = cmp;
    // eslint-disable-next-line no-unused-vars
    const { width, height, transform } = style;
    const trans = parseFloat(transform);

    const r = height / 2;

    const ang = ((trans + 90) * Math.PI) / 180;

    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];

    let startX = e.pageX + offsetX;
    let startY = e.pageY + offsetY;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;

      deg = parseInt(deg as unknown as string);

      canvasContext.updateAssemblyCmps({
        transform: deg - transform,
      });
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
    <div
      className="z-[9999] absolute font-bold"
      style={{
        top: height + 500 / zoom,
        left: width / 2 - 14,
        transform,
      }}
      onMouseDown={rotate}
    >
      <img src={rotateSvg} alt="rotate" />
    </div>
  );
};

export default Rotate;
