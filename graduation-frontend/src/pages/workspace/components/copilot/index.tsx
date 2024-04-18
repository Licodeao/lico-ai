import { useState, type FC, type ReactNode } from "react";
import Star from "@/assets/img/star.svg";

import { useForm } from "react-hook-form";
import { Button, Select, MenuItem, Skeleton } from "@mui/material";
import { exportVideo, getVideo, query } from "@/service/modules/video";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";
import ImageItem from "@/components/imageItem";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddIcon from "@mui/icons-material/Add";
import { TransitionGroup } from "react-transition-group";
import {
  AddTextAction,
  changeImageListAction,
  changeSelectedAudio,
  changeSelectedDigital,
  changeSelectedResolution,
  removeTextAction,
} from "@/store/modules/workspace";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Digital from "@/components/digital";
import { addVideoAction, changeIsLoading } from "@/store/modules/canvas";
import { useNavigate } from "react-router-dom";
import {
  changeUsagePlusExportLimitAction,
  changeUsageStandardExportLimitAction,
} from "@/store/modules/user";
interface IProps {
  children?: ReactNode;
}

interface FormValue {
  textarea: string;
  inputValue: string;
  text: string;
  digital: string;
  audio: number;
  resolution: string;
}

const Copilot: FC<IProps> = () => {
  const { handleSubmit, register } = useForm<FormValue>();
  const [inputValue, setInputValue] = useState<string>("");
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    imageList,
    textList,
    digitalList,
    audioList,
    resolutionList,
    selectedDigital,
    selectedAudio,
    selectedResolution,
    isLoading,
    video,
    user,
  } = useAppSelector(
    (state) => ({
      imageList: state.workspace.imageList,
      textList: state.workspace.textList,
      digitalList: state.workspace.digitalList,
      audioList: state.workspace.audioList,
      resolutionList: state.workspace.resolutionList,
      selectedDigital: state.workspace.selectedDigital,
      selectedAudio: state.workspace.selectedAudio,
      selectedResolution: state.workspace.selectedResolution,
      isLoading: state.canvas.isLoading,
      video: state.canvas.video,
      user: state.user.userInfo,
    }),
    shallowEqual
  );

  const handleImageSubmit = () => {
    dispatch(changeImageListAction(inputValue));
  };

  const handleTextSubmit = () => {
    dispatch(AddTextAction(text));
  };

  const handleRemoveText = (text: string) => {
    dispatch(removeTextAction(text));
  };

  const handleDigitalClick = (e) => {
    dispatch(changeSelectedDigital(e.target.id));
  };

  const handleAllSubmit = async () => {
    await getVideo(
      textList.join(""),
      imageList[0],
      selectedDigital,
      selectedAudio,
      selectedResolution
    );

    dispatch(changeIsLoading(true));

    await setTimeout(async () => {
      await query().then((res) => {
        console.log(res);
        console.log(JSON.parse(res.data));

        const video = JSON.parse(res.data);

        if (video) {
          dispatch(addVideoAction(video));
          dispatch(changeIsLoading(false));
        }
      });
    }, 130000);
  };

  const handleExport = async () => {
    const url = video![1]!.data.videoAddr;
    const email = user[0].email;
    await exportVideo(url, email).then((res) => {
      if (res.code === 200) {
        if (user[0].roles[0].name === 0) {
          dispatch(changeUsageStandardExportLimitAction(-1));
        } else {
          dispatch(changeUsagePlusExportLimitAction(-1));
        }
      }
    });
  };

  return (
    <div className="flex-6 py-4 px-8 flex flex-col justify-center">
      {!isLoading ? (
        !video ? (
          <Skeleton
            variant="rectangular"
            className="w-screen h-screen"
          ></Skeleton>
        ) : (
          <div className="w-full flex flex-row justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <video
                src={video[1].data.videoAddr}
                muted
                controls
                className="w-1/2 h-full"
              />
              <div className="w-1/2 flex flex-row justify-end items-center gap-4">
                <Button onClick={() => navigate("/edit/setting")}>编辑</Button>
                <Button onClick={handleExport}>导出</Button>
              </div>
            </div>
          </div>
        )
      ) : (
        <form
          className="flex flex-col justify-center items-center gap-12"
          noValidate
          onSubmit={handleSubmit(handleAllSubmit)}
        >
          <div className="w-1/2 flex flex-col justify-center items-start">
            <div>
              <span className="text-lg font-bold">照片集</span>
              <span className="text-xs text-[#666] ml-2">
                (当前只支持网络照片)
              </span>
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex flex-row justify-center items-center">
                <input
                  type="text"
                  style={{
                    width: "600px",
                    height: "40px",
                    backgroundColor: "transparent",
                    border: "1px solid #eee",
                    borderRadius: "10px",
                  }}
                  value={inputValue}
                  {...register("inputValue", {
                    required: true,
                    onChange: (e) => setInputValue(e.target.value),
                  })}
                />
                <Button onClick={handleImageSubmit}>
                  <AddTaskIcon
                    style={{
                      fontSize: "35px",
                      cursor: "pointer",
                    }}
                  />
                </Button>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                {imageList.map((item) => {
                  return <ImageItem url={item} key={Math.random()} />;
                })}
              </div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start gap-3">
            <div className="flex flex-row justify-center items-center gap-1">
              <span className="text-lg font-bold">主题和介绍</span>
              <span className="text-xs text-[#666] ml-2">
                (在这里描述视频的内容)
              </span>
            </div>

            <div className="flex flex-col justify-center items-start gap-4">
              <div className="flex flex-row justify-center items-center gap-3">
                <input
                  type="text"
                  style={{
                    width: "600px",
                    height: "40px",
                    backgroundColor: "transparent",
                    border: "1px solid #eee",
                    borderRadius: "10px",
                  }}
                  value={text}
                  {...register("text", {
                    required: true,
                    onChange: (e) => setText(e.target.value),
                  })}
                />
                <div onClick={handleTextSubmit}>
                  <AddIcon
                    style={{
                      fontSize: "35px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <List sx={{ mt: 1 }}>
                <TransitionGroup>
                  {textList.map((item) => (
                    <Collapse key={Math.random()}>
                      <ListItem
                        style={{
                          padding: "10px 0",
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            title="Delete"
                            onClick={() => handleRemoveText(item)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <input
                          type="text"
                          style={{
                            width: "600px",
                            height: "40px",
                            backgroundColor: "transparent",
                            border: "1px solid #eee",
                            borderRadius: "10px",
                          }}
                          value={item}
                          onChange={(e) => setText(e.target.value)}
                        />
                      </ListItem>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start gap-4">
            <div>
              <span className="text-lg font-bold">视频分辨率</span>
              <span className="text-xs text-[#666] ml-2">
                (选择生成视频分辨率)
              </span>
            </div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedResolution}
              sx={{
                width: "80%",
              }}
              {...register("resolution", {
                onChange: (e) => {
                  dispatch(changeSelectedResolution(e.target.value));
                },
              })}
            >
              {resolutionList.map((item) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start gap-4">
            <div>
              <span className="text-lg font-bold">数字人工作流</span>
              <span className="text-xs text-[#666] ml-2">
                (选择是否使用数字人, 扩展能力非必选)
              </span>
            </div>
            <div
              className="flex flex-row justify-center items-center gap-12"
              onClick={handleDigitalClick}
              {...register("digital")}
            >
              {digitalList.map((item) => {
                return (
                  <Digital
                    id={item.id}
                    url={item.url}
                    alt={item.alt}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start gap-4">
            <div>
              <span className="text-lg font-bold">视频音效</span>
              <span className="text-xs text-[#666] ml-2">
                (选择是否使用音效, 扩展能力非必选)
              </span>
            </div>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedAudio}
              sx={{
                width: "80%",
              }}
              {...register("audio", {
                onChange: (e) => {
                  dispatch(changeSelectedAudio(e.target.value));
                },
              })}
            >
              {audioList.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          {/* {!!errors.inputValue && !errors.text && <HelperTip />} */}

          <div className="w-1/2 flex flex-row justify-start items-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#1E64DA",
                width: "600px",
              }}
              // disabled={generateVideoFromText.isPending}
            >
              <span className="text-white mr-1">生成视频</span>
              <img src={Star} alt="star" />
            </Button>
          </div>

          {/* {generateVideoFromText.isPending ? <div>loading...</div> : <video />} */}

          <div className="text-sm text-[#7E7E7E] font-normal">
            Lico-AI 产生的结果{" "}
            <span className=" text-red-100 font-bold">并不完全可信</span>,
            可能会产生误差, 请审查并根据需要进行编辑更改!
          </div>
        </form>
      )}
    </div>
  );
};

export default Copilot;
