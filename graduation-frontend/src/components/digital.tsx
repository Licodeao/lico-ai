import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  id: string;
  alt: string;
  url: string;
}

const Digital: FC<IProps> = ({ id, alt, url }) => {
  return (
    <img
      id={id}
      src={url}
      alt={alt}
      style={{
        width: "110px",
        height: "150px",
        cursor: "pointer",
      }}
      className="hover:bg-black hover:rounded-lg hover:p-2"
    />
  );
};

export default Digital;
