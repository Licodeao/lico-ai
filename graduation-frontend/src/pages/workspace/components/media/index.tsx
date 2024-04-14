import type { FC, FormEvent, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import TodayIcon from "@mui/icons-material/Today";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";
import { changeDialogOpenAciton } from "@/store/modules/workspace";
import { createAlbum } from "@/service/modules/media";
import {
  changeAlbumsListAction,
  changeMediaListAction,
} from "@/store/modules/media";
import Album from "./components/album";

interface IProps {
  children?: ReactNode;
}

const Media: FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const { dialogOpen, albumsList } = useAppSelector(
    (state) => ({
      dialogOpen: state.workspace.dialogOpen,
      albumsList: state.media.albumsList,
    }),
    shallowEqual
  );

  const handleCreateAlbum = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAlbum(e.target[0].value);
    await dispatch(changeAlbumsListAction(e.target[0].value));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const { name, size, type } = e.target.files[0];
      dispatch(changeMediaListAction(e.target.files[0]));
    }
  };

  return (
    <div className="flex-6 py-4 px-8 flex flex-col gap-3">
      {location.pathname === "/workspace/media" ? (
        <div>
          <h1 className="font-semibold">媒体库</h1>

          <div className="flex flex-col gap-3 mb-24">
            <div className="flex flex-row justify-start items-center gap-3 text-base">
              <div className="flex flex-row justify-start items-center gap-1">
                <ArtTrackIcon />
                <span>分组</span>
              </div>
              <div
                className="text-[#0F73FF] cursor-pointer"
                onClick={() => dispatch(changeDialogOpenAciton(true))}
              >
                创建分组
              </div>
              <Dialog
                open={dialogOpen}
                onClose={() => dispatch(changeDialogOpenAciton(false))}
                PaperProps={{
                  component: "form",
                  onSubmit: (e: FormEvent<HTMLFormElement>) =>
                    handleCreateAlbum(e),
                }}
              >
                <DialogTitle>创建一个新的分组</DialogTitle>
                <DialogContent>
                  <TextField
                    placeholder="输入新的分组名称"
                    sx={{
                      width: "500px",
                    }}
                  />
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={() => dispatch(changeDialogOpenAciton(false))}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={() => dispatch(changeDialogOpenAciton(false))}
                    type="submit"
                  >
                    确定
                  </Button>
                </DialogActions>
              </Dialog>
              <div
                className="text-[#0F73FF] cursor-pointer"
                onClick={() => navigate("/workspace/media/albums")}
              >
                查看全部分组
              </div>
            </div>
            <div className="mt-4 flex flex-row justify-start items-center gap-3">
              {albumsList?.map((item) => {
                return <Album albumName={item} key={item} />;
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-[#000000] rounded-md py-2">
              <div className="ml-2 flex flex-row justify-start items-center gap-1">
                <TodayIcon />
                <span>今日上传</span>
              </div>
            </div>
            <div>
              <input
                id="uploadFile"
                type="file"
                accept=".jpeg,.jpg,.png,.webp,.avi,.mp4,.mpeg,.mov,.mp3,.m4a,.wav"
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
              <label htmlFor="uploadFile">
                <div className="w-[120px] flex flex-row justify-start items-center gap-2 bg-[#2A76CF] rounded-md p-3 hover:bg-[#2365BD] cursor-pointer">
                  <CloudUploadIcon />
                  <span>上传资源</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Media;
