import { useState, type FC, type ReactNode } from "react";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";

import UploadSvg from "@/assets/img/upload.svg";
import TranslateSvg from "@/assets/img/translate.svg";
import ClearSvg from "@/assets/img/clear.svg";
import PlusSvg from "@/assets/img/plus.svg";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import {
  changeCanvasWidthAndHeightAction,
  changeColorAction,
  changeSelectValueAction,
  changeSettingColorVisibleAction,
} from "@/store/modules/canvas";
import { shallowEqual } from "react-redux";
import { ChromePicker } from "react-color";

interface IProps {
  children?: ReactNode;
}

const EditSetting: FC<IProps> = () => {
  const [radioValue, setRadioValue] = useState<string>("color");
  const dispatch = useAppDispatch();

  const { options, selectValueStore, color, settingColorVisible } =
    useAppSelector(
      (state) => ({
        options: state.canvas.selectOption,
        selectValueStore: state.canvas.selectValue,
        color: state.canvas.defaultCanvas!.style.backgroundColor,
        colorVisible: state.canvas.colorVisible,
        settingColorVisible: state.canvas.settingColorVisible,
      }),
      shallowEqual
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const handleSelectChange = (event) => {
    dispatch(changeSelectValueAction(event.target.value));
    const correntOption = options!.find(
      (item) => item.value === Number(event.target.value)
    );
    dispatch(changeCanvasWidthAndHeightAction(correntOption));
  };

  const handleChromePicker = () => {
    dispatch(changeSettingColorVisibleAction(!settingColorVisible));
  };

  const handleColorChange = (e) => {
    dispatch(changeColorAction(e.hex));
  };

  return (
    <form
      className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]"
      noValidate
    >
      <span className="text-[18px]">项目设置</span>
      <div className="flex flex-col gap-6 justify-center">
        <h4>适配平台与规格</h4>
        <Select
          defaultValue={1}
          sx={{
            width: "100%",
            borderRadius: "10px",
          }}
          value={selectValueStore}
          onChange={handleSelectChange}
        >
          {options!.map((item) => {
            return (
              <MenuItem value={item.value} key={item.value} data-option={item}>
                <div className="flex flex-row items-center gap-2">
                  <img src={item.icon} alt={item.label} className="w-4 h-4" />
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

      <div className="flex flex-col gap-6 justify-center">
        <h4>背景色</h4>
        <FormControl>
          <RadioGroup value={radioValue} onChange={handleChange}>
            <div className="border-[0.5px] border-[#DFE0E5] rounded-lg">
              <div className="w-full flex flex-row justify-between items-center p-4">
                <FormControlLabel
                  value="color"
                  control={<Radio />}
                  label="颜色"
                />
                <div className="flex flex-row gap-1 justify-around items-center relative">
                  <Input
                    sx={{
                      width: "70%",
                      color: "#5E647A",
                      fontSize: "12px",
                    }}
                    value={color}
                  />
                  {settingColorVisible && (
                    <div className="absolute top-12 -left-16">
                      <ChromePicker
                        color={color}
                        onChange={(e) => handleColorChange(e)}
                        onChangeComplete={(e) =>
                          dispatch(changeColorAction(e.hex))
                        }
                      />
                    </div>
                  )}
                  <button
                    style={{
                      backgroundColor: color,
                    }}
                    className="p-1 rounded-full text-white"
                    onClick={handleChromePicker}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8.935 13.422a1.656 1.656 0 01-1.174.486c-.426 0-.851-.162-1.175-.486l-3.1-3.1a1.663 1.663 0 010-2.349l4.263-4.262c.22-.22.577-.22.798 0l4.65 4.65c.221.221.221.578 0 .799l-4.262 4.262zm3.064-4.662L8.148 4.909 4.285 8.771a.13.13 0 00-.021.03c-.004.008-.009.016-.015.023h7.685L12 8.76zm1.59 5.15c-.778 0-1.412-.655-1.412-1.46 0-.648.81-1.927 1.059-2.304.156-.238.55-.238.707 0 .249.377 1.059 1.656 1.059 2.304 0 .805-.634 1.46-1.412 1.46z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="border-[0.5px] border-[#E0E0E0]"></div>
              <div className="w-full flex flex-row justify-between items-center p-4">
                <FormControlLabel
                  value="image"
                  control={<Radio />}
                  label="图片"
                />
                <div>
                  <input
                    type="file"
                    style={{
                      display: "none",
                    }}
                    id="file"
                  />
                  {radioValue === "image" && (
                    <label
                      htmlFor="file"
                      className="flex flex-row gap-4 justify-around items-center"
                    >
                      <span className="text-[#9194A5] text-sm hover:text-[#2C98FA]">
                        上传
                      </span>
                      <img src={UploadSvg} alt="uploadSvg" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="flex flex-col gap-6 justify-center">
        <h4>音频设置</h4>
        <div className="w-full border-[0.5px] border-[#DFE0E5] rounded-lg hover:border-[#A5A7AD]">
          <div className="flex flex-row justify-start items-center p-4 gap-4">
            <div className="bg-[#F0F9FF] p-2 rounded-md">
              <img src={TranslateSvg} alt="translateSvg" />
            </div>
            <div className="flex flex-col justify-start font-normal">
              <span className="text-sm">翻译声音</span>
              <span className="text-xs text-[#9194A5]">添加多语言语音翻译</span>
            </div>
          </div>
        </div>
        <div className="w-full border-[0.5px] border-[#DFE0E5] rounded-lg hover:border-[#A5A7AD]">
          <div className="flex justify-between items-center">
            <div className="flex flex-row justify-start items-center p-4 gap-4">
              <div className="bg-[#F0F9FF] p-2 rounded-md">
                <img src={ClearSvg} alt="clearSvg" />
              </div>
              <div className="flex flex-col justify-start font-normal">
                <span className="text-sm">清除音频</span>
                <span className="text-xs text-[#9194A5]">
                  消除视频的背景噪音
                </span>
              </div>
            </div>
            <div className="bg-[#F9A432] w-5 h-5 rounded-md flex justify-center items-center mr-7">
              <img src={PlusSvg} alt="plusSvg" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditSetting;
