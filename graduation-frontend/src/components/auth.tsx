import type { FC, ReactNode } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  btnText: string;
  tipPrefix: string;
  tipSuffix: string;
  url: string;
}

const AuthComponent: FC<IProps> = ({ btnText, tipPrefix, tipSuffix, url }) => {
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="输入邮箱"
        variant="outlined"
        sx={{
          width: "70%",
        }}
        onInput={(e) => handleInput(e)}
        onBlur={(e) => console.log(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{
          width: "70%",
        }}
      >
        {btnText}
      </Button>

      <div className="text-[12px]">
        <p>
          {tipPrefix}{" "}
          <Link to={url} className="text-blue-500 no-underline">
            {tipSuffix} {">"}
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthComponent;
