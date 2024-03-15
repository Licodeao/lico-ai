import { useState, type FC, type ReactNode } from "react";
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
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const emailRegExp =
    /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
  const handleBlurEvent = (e) => {
    if (!emailRegExp.test(e.target.value)) {
      setError(true);
      setHelperText("邮箱格式不正确，请重新输入!");
    }
    if (e.target.value === "") {
      setError(error);
      setHelperText("您需要输入邮箱!");
    }
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
        onBlur={(e) => handleBlurEvent(e)}
        error={error}
        helperText={helperText}
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
