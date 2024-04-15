import { findMediaByAlbum } from "@/service/modules/media";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const AlbumContent: FC<IProps> = () => {
  const navigate = useNavigate();
  const [mediaList, setMediaList] = useState<any[]>([]);
  const { album } = useParams();

  useEffect(() => {
    if (album) {
      findMediaByAlbum(album).then((res) => setMediaList(res.data));
    }
  }, []);

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

      <div>
        {mediaList.length === 0 ? (
          <div>当前分组下没有资源</div>
        ) : (
          mediaList.map((item) => {
            return (
              <div className="flex flex-col justify-center items-center gap-1">
                <img
                  src={`http://localhost:3000/public/${item.name}`}
                  alt={item.name}
                  className="w-56 h-28"
                />
                <span>
                  于 {new Date(item.create_time).toLocaleString()} 上传
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlbumContent;
