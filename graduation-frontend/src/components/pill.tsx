import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  style?: object;
  text?: string;
  onClick?: () => void;
}

const Pill: FC<IProps> = ({ src, alt, style, text, onClick }) => {
  return (
    <div
      className="flex justify-center items-center w-4/5 cursor-pointer text-sm h-11 leading-[44px] text-center rounded-[80px] bg-[#202020] hover:bg-[#161616]"
      onClick={onClick}
    >
      <img src={src} alt={alt} style={style} /> {text}
    </div>
  );
};

export default Pill;
