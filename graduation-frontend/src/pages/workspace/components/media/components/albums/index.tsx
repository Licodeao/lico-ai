import type { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Albums: FC<IProps> = () => {
  const navigate = useNavigate();

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
        <div className="text-[#0F73FF] cursor-pointer">创建分组</div>
        <div>data</div>
      </div>
    </div>
  );
};

export default Albums;
