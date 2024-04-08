import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const AlbumContent: FC<IProps> = () => {
  const navigate = useNavigate();
  const { album } = useParams();

  return (
    <div className="flex flex-col items-start gap-3">
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

      <h1 className="text-semibold">{album}</h1>

      <div>当前分组下没有资源</div>
    </div>
  );
};

export default AlbumContent;
