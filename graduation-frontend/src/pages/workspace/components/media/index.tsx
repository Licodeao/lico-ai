import {
  useEffect,
  useState,
  type FC,
  type FormEvent,
  type ReactNode,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import TodayIcon from "@mui/icons-material/Today";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";
import { changeDialogOpenAciton } from "@/store/modules/workspace";
import {
  createAlbum,
  getAllAlbums,
  moveMediaToAlbum,
  uploadMediaFile,
} from "@/service/modules/media";
import {
  changeAlbumsListAction,
  changeMediaListAction,
} from "@/store/modules/media";
import Album from "./components/album";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface IProps {
  children?: ReactNode;
}

const Media: FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [allAlbums, setAllAlbums] = useState([]);
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleChangeAlbum = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (e) => {
    setAnchorEl(null);
    const { innerText, dataset } = e.target;
    await moveMediaToAlbum(innerText, dataset.media).then((res) => {
      if (res.code === 200) {
        setSnackBarOpen(true);
      }
    });
  };

  const handleSnackBarClose = async () => {
    setSnackBarOpen(!snackBarOpen);
  };

  useEffect(() => {
    getAllAlbums().then((res) => setAllAlbums(res));
  }, []);

  const { dialogOpen, albumsList, mediaList } = useAppSelector(
    (state) => ({
      dialogOpen: state.workspace.dialogOpen,
      albumsList: state.media.albumsList,
      mediaList: state.media.mediaList,
    }),
    shallowEqual
  );

  const handleCreateAlbum = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAlbum(e.target[0].value);
    await dispatch(changeAlbumsListAction(e.target[0].value));
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const formattedDate = `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`;

    if (e.target.files[0]) {
      const { name, size, type } = e.target.files[0];
      await uploadMediaFile(e.target.files[0]).then(async (res) => {
        const { imageUrl } = res;
        await dispatch(
          changeMediaListAction({ name, size, type, imageUrl, formattedDate })
        );
      });
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
              {albumsList.length === 0 ? (
                <div className="w-full text-md text-[#eee] flex justify-center items-center">
                  当前无分组
                </div>
              ) : (
                albumsList?.map((item) => {
                  return <Album albumName={item} key={item} />;
                })
              )}
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

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackBarOpen}
              onClose={handleSnackBarClose}
            >
              <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                移入成功!
              </Alert>
            </Snackbar>

            <div className="flex flex-row justify-start items-center gap-3 flex-wrap">
              {mediaList?.map((media, index) => {
                return (
                  <div key={index} className="cursor-pointer relative">
                    <img
                      src={media.imageUrl}
                      alt={media.name}
                      className="w-56 h-28"
                    />
                    <span className="text-xs text-[#eee]">
                      于 {media.formattedDate} 上传
                    </span>
                    <div
                      className="absolute top-1 right-1"
                      onClick={handleChangeAlbum}
                    >
                      <SwapVertIcon />
                    </div>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {allAlbums?.map((item: { name: string }) => {
                        return (
                          <MenuItem
                            onClick={handleClose}
                            key={item.name}
                            data-media={media.imageUrl}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </div>
                );
              })}
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
