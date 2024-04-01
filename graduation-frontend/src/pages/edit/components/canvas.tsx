import { type FC, type ReactNode } from "react";
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
        color: state.canvas.defaultCanvas.style.backgroundColor,
        colorVisible: state.canvas.colorVisible,
      }),
      shallowEqual
    );
  const dispatch = useAppDispatch();
  const handleSelectChange = (event) => {
    dispatch(changeSelectValueAction(event.target.value));
    const correntOption = options.find(
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

  return (
    <div className="w-full h-full flex-1 bg-[#F7F7F8] flex flex-col">
      <CanvasHeader />
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        <div
          style={{
            ...canvasDefaultStyle.style,
          }}
        />
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
                  {options.map((item) => {
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
                          <span>{item.label}</span>{" "}
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
