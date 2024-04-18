import type { FC, ReactNode } from "react";
import copy from "@/assets/img/copy.svg";
import contextDel from "@/assets/img/contextDel.svg";
import topTrans from "@/assets/img/topTrans.svg";
import bottomTrans from "@/assets/img/bottomTrans.svg";
import toTop from "@/assets/img/toTop.svg";
import toBottom from "@/assets/img/toBottom.svg";
import { useCanvasByContext } from "@/store/modules/hook";

interface IProps {
  children?: ReactNode;
  style: any;
}

const ContextMenu: FC<IProps> = ({ style }) => {
  const canvas = useCanvasByContext();

  const copyCmp = (e) => {
    e.stopPropagation();
    canvas.addAssemblyCms();
  };

  const delCmp = (e) => {
    e.stopPropagation();
    canvas.deleteCmp();
  };

  const addCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.addCmpZIndex();
  };

  const subCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.subCmpZIndex();
  };

  const topCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.topCmpZIndex();
  };

  const bottomCmpZIndex = (e) => {
    e.stopPropagation();
    canvas.bottomCmpZIndex();
  };

  const hasAssembly = canvas.hasAssembly();

  return (
    <ul
      className="z-[9999] absolute w-[115px] max-h-[310px] shadow-md bg-white bg-opacity-95 rounded-md text-left text-xs transform origin-top transition-opacity duration-300"
      style={style}
    >
      <li
        className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
        onClick={(e) => copyCmp(e)}
      >
        <img
          src={copy}
          alt="copy"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
        <span>复制</span>
      </li>
      <li
        className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
        onClick={(e) => delCmp(e)}
      >
        <img
          src={contextDel}
          alt="contextDel"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
        <span>删除</span>
      </li>
      {!hasAssembly && (
        <>
          <li
            className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
            onClick={(e) => addCmpZIndex(e)}
          >
            <img
              src={topTrans}
              alt="topTrans"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span>上移</span>
          </li>
          <li
            className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
            onClick={(e) => subCmpZIndex(e)}
          >
            <img
              src={bottomTrans}
              alt="bottomTrans"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span>下移</span>
          </li>
          <li
            className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
            onClick={(e) => topCmpZIndex(e)}
          >
            <img
              src={toTop}
              alt="toTop"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span>置顶</span>
          </li>
          <li
            className="flex justify-around items-center py-4 px-2 bg-white cursor-default transition-colors duration-300 border-b border-gray-300 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
            onClick={(e) => bottomCmpZIndex(e)}
          >
            <img
              src={toBottom}
              alt="toBottom"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span>置底</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default ContextMenu;
