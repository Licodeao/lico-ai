import {
  useEffect,
  useState,
  type FC,
  type FormEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import Album from "../album";
import { changeDialogOpenAciton } from "@/store/modules/workspace";
import { changeAlbumsListAction } from "@/store/modules/media";
import { createAlbum, getAllAlbums } from "@/service/modules/media";

interface IProps {
  children?: ReactNode;
}

const Albums: FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allAlbums, setAllAlbums] = useState([]);

  useEffect(() => {
    getAllAlbums().then((res) => setAllAlbums(res));
  }, []);

  const { albumsList, dialogOpen } = useAppSelector(
    (state) => ({
      albumsList: state.media.albumsList,
      dialogOpen: state.workspace.dialogOpen,
    }),
    shallowEqual
  );

  const handleCreateAlbum = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAlbum(e.target[0].value);
    await dispatch(changeAlbumsListAction(e.target[0].value));
  };

  return (
    <div>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/workspace/media")}
            className="cursor-pointer"
          >
            媒体库
          </Link>
          <Typography color="text.primary">所有分组</Typography>
        </Breadcrumbs>
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="font-semibold">所有分组</h1>
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
            onSubmit: (e: FormEvent<HTMLFormElement>) => handleCreateAlbum(e),
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
            <Button onClick={() => dispatch(changeDialogOpenAciton(false))}>
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
        <div className="flex flex-row justify-start items-center gap-3">
          {albumsList.length === 0
            ? allAlbums.map((item: { name: string }) => {
                return <Album albumName={item.name} key={item.name} />;
              })
            : albumsList?.map((item) => {
                return <Album albumName={item} key={item} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Albums;
