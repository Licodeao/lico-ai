import type { FC, ReactNode } from "react";
import NotFoundImage from "@/assets/img/404.png";
import NotFoundImageSvg from "@/assets/img/404.svg";

interface IProps {
  children?: ReactNode;
}

const NotFound: FC<IProps> = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center gap-5"
      style={{
        backgroundImage: `url(${NotFoundImage})`,
      }}
    >
      <h4 className="text-[#8FADF4] font-bold text-7xl uppercase">Error</h4>
      <img
        src={NotFoundImageSvg}
        alt="404"
        className="flex justify-center items-center w-[726px] h-[276px]"
      />
      <h3 className="text-[#8FADF4] font-bold text-4xl">
        当前页面已经走丢了, 快回家吧!
      </h3>
      <a
        className="bg-[#336aea] text-white mt-12 px-8 py-2 rounded-md hover:bg-[#3454B5]"
        href="/"
      >
        返回主页
      </a>

      <div className="fixed bottom-8 text-sm text-white">
        如果你仍然认为这是个错误, 请联系邮箱{" "}
        <a
          href="mailto:licodeao@gmail.com?subject=Error 404 in Lico-AI"
          className="text-[#336AEA]"
        >
          licodeao@gmail.com
        </a>
      </div>
    </div>
  );
};

export default NotFound;
