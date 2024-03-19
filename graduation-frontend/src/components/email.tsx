import { useMemo, type FC, type ReactNode } from "react";
import { useFormControl } from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps {
  children?: ReactNode;
}

const HelperText = () => {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return "focused";
    }

    return "请在您的邮箱查看我发的邮件!";
  }, [focused]);

  return <div>{helperText}</div>;
};

const EmailLogin: FC<IProps> = () => {
  return (
    <form autoComplete="off">
      <TextField id="outlined-basic" label="请输入邮箱验证码" />
      <HelperText />
      <Button type="submit" variant="contained">
        登录
      </Button>
    </form>
  );
};

export default EmailLogin;
