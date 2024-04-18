import type { FC, ReactNode } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "@/store/storeHook";
import { removeImageAction } from "@/store/modules/workspace";

interface IProps {
  children?: ReactNode;
  url: string;
}

const ImageItem: FC<IProps> = ({ url }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <img
        src={url}
        alt="image"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
        }}
      />
      <input
        type="text"
        value={url}
        onChange={() => {}}
        style={{
          width: "550px",
          height: "40px",
          backgroundColor: "transparent",
          border: "1px solid #eee",
          borderRadius: "10px",
        }}
      />
      <div
        className="cursor-pointer"
        onClick={() => dispatch(removeImageAction(url))}
      >
        <DeleteIcon
          style={{
            fontSize: "35px",
          }}
        />
      </div>
    </div>
  );
};

export default ImageItem;
