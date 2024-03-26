import type { FC, ReactNode } from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface IProps {
  children?: ReactNode;
}

const Exports: FC<IProps> = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row gap-2 items-center">
        <ImportExportIcon fontSize="medium" />
        <div className="text-[#CBCBCB]">Exports</div>
      </div>
      <div className="w-full h-full flex justify-center items-center text-[#808080] gap-1">
        <ErrorOutlineIcon fontSize="small" />
        暂无导出的视频资源
      </div>
    </div>
  );
};

export default Exports;
