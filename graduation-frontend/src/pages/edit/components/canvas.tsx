import { useCallback, useState, type FC, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";
import CanvasHeader from "./header";
import {
  changeCanvasWidthAndHeightAction,
  changeColorAction,
  changeColorVisibleAction,
  changeSelectValueAction,
} from "@/store/modules/canvas";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ChromePicker } from "react-color";
import { useCanvasByContext } from "@/store/modules/hook";
import Cmp from "./Cmp";
import EditLine from "./EditLine";
import subSvg from "@/assets/img/sub.svg";
import plusSvg from "@/assets/img/pluss.svg";
interface IProps {
  children?: ReactNode;
}

const Canvas: FC<IProps> = () => {
  const { canvasDefaultStyle, options, selectValueStore, color, colorVisible } =
    useAppSelector(
      (state) => ({
        canvasDefaultStyle: state.canvas.defaultCanvas,
        options: state.canvas.selectOption,
        selectValueStore: state.canvas.selectValue,
        color: state.canvas.defaultCanvas!.style.backgroundColor,
        colorVisible: state.canvas.colorVisible,
      }),
      shallowEqual
    );
  const dispatch = useAppDispatch();
  const handleSelectChange = (event) => {
    dispatch(changeSelectValueAction(event.target.value));
    const correntOption = options!.find(
      (item) => item.value === Number(event.target.value)
    );
    dispatch(changeCanvasWidthAndHeightAction(correntOption));
  };

  const handleColorChange = (e) => {
    dispatch(changeColorAction(e.hex));
  };

  const handleChromePicker = () => {
    dispatch(changeColorVisibleAction(!colorVisible));
  };

  const canvas = useCanvasByContext();

  const canvasData = canvas.getCanvas();

  const { style, cmps } = canvasData;

  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width as unknown as string) > 800 ? 50 : 100
  );

  const onDrop = useCallback(
    (e) => {
      const endX = e.pageX;
      const endY = e.pageY;

      let dragCmp = e.dataTransfer.getData("drag-cmp");

      if (!dragCmp) {
        return;
      }

      dragCmp = JSON.parse(dragCmp);

      const canvasDOMPos = {
        top: 110,
        left: document.body.clientWidth / 2 - (style.width / 2) * (zoom / 100),
      };

      const startX = canvasDOMPos.left;
      const startY = canvasDOMPos.top;

      let disX = endX - startX;
      let disY = endY - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      dragCmp.style.left = disX - dragCmp.style.width / 2;
      dragCmp.style.top = disY - dragCmp.style.height / 2;

      canvas.addCmps(dragCmp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zoom, style.width]
  );

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  const selectedIndex = canvas.getSelectedCmpIndex();

  return (
    <div className="w-full h-full flex-1 bg-[#F7F7F8] flex flex-col">
      <CanvasHeader />
      <div
        className="flex-1 flex flex-col justify-center items-center gap-3"
        tabIndex={0}
        onClick={(e: any) => {
          if (e.target.id === "center") {
            canvas.setSelectedCmpIndex(-1);
          }
        }}
      >
        <div
          id="center"
          className="flex flex-1 justify-center py-14 text-center"
        >
          <div
            id="canvas"
            className="relative border-[1px] border-[#dddddd] shadow-md transform origin-top"
            style={{
              ...canvasDefaultStyle!.style,
              // ...canvasData.style,
              backgroundImage: `url(${canvasData.style.backgroundImage})`,
              transform: `scale(${zoom / 100})`,
            }}
            onDrop={onDrop}
            onDragOver={allowDrop}
          >
            {selectedIndex !== -1 && (
              <EditLine selectedIndex={selectedIndex} zoom={zoom} />
            )}

            <div
              className="absolute overflow-hidden"
              style={{
                width: canvasData.style.width,
                height: canvasData.style.height,
              }}
            >
              {cmps.map((cmp, index) => {
                return <Cmp key={index} cmp={cmp} index={index} />;
              })}
            </div>
          </div>
          <ul className="fixed right-[25px] bottom-[160px] bg-[#ffffff] rounded-[5px] shadow-lg flex justify-center items-center h-[30px] leading-[30px] px-4">
            <li
              style={{ cursor: "zoom-out" }}
              onClick={() => {
                const newZoom = zoom - 5 >= 1 ? zoom - 5 : 1;
                setZoom(newZoom);
              }}
            >
              <img src={subSvg} alt="sub" />
            </li>
            <li className="flex justify-center items-center font-[12px] text-center">
              <input
                type="num"
                value={zoom}
                onChange={(e) => {
                  let newValue = e.target.value as unknown as number;
                  newValue = newValue >= 1 ? newValue : 1;
                  setZoom(newValue - 0);
                }}
                style={{
                  width: "70px",
                  padding: "0 20px",
                }}
              />
              <span className="mr-1">%</span>
            </li>
            <li
              style={{ cursor: "zoom-in" }}
              onClick={() => {
                setZoom(zoom + 5);
              }}
            >
              <img src={plusSvg} alt="plus" />
            </li>
          </ul>
        </div>
        <div className="w-1/3 h-[54px] flex flex-row justify-center items-center rounded-lg border-[0.5px] border-[#DFE0E5]">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-1/2 h-full bg-[#F7F7F8]">
              <div>
                <Select
                  defaultValue={1}
                  sx={{
                    width: "105%",
                    height: "90%",
                    borderRadius: "10px",
                    borderColor: "#DFE0E5",
                    hover: {
                      backgroundColor: "#F7F7F8",
                    },
                  }}
                  value={selectValueStore}
                  onChange={handleSelectChange}
                >
                  {options!.map((item) => {
                    return (
                      <MenuItem
                        value={item.value}
                        key={item.value}
                        data-option={item}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="w-4 h-4"
                          />
                          <span className="text-black">{item.label}</span>{" "}
                          <span className="text-[12px] text-[#8E9199]">
                            ({item.ratio})
                          </span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="w-1/2 h-full text-sm flex flex-row justify-center items-center gap-2 cursor-pointer relative">
              {colorVisible && (
                <div className="absolute -top-64 left-2">
                  <ChromePicker
                    color={color}
                    onChange={(e) => handleColorChange(e)}
                    onChangeComplete={(e) => dispatch(changeColorAction(e.hex))}
                  />
                </div>
              )}
              <div
                onClick={handleChromePicker}
                className="flex flex-row justify-center items-center gap-2"
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <span>背景色</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
