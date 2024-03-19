import { useState, useMemo, type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormControl } from "@mui/material/FormControl";

interface IProps {
  children?: ReactNode;
  btnText: string;
  tipPrefix: string;
  tipSuffix: string;
  url: string;
}

interface FormValue {
  email: string;
}

const AuthComponent: FC<IProps> = ({ btnText, tipPrefix, tipSuffix, url }) => {
  const [confirmLogin, setConfirmLogin] = useState<boolean>(false);
  const { handleSubmit, register, formState } = useForm<FormValue>({
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;

  const emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  const onSubmit = (data: FormValue) => {
    console.log(data);
    setConfirmLogin(true);
  };

  const HelperText = () => {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (focused) {
        return "focused";
      }

      return "请在您的邮箱查看我发的邮件!";
    }, [focused]);

    return <div className="text-[12px] text-[#85C027] my-2">{helperText}</div>;
  };

  return (
    <>
      <form
        style={{
          width: "70%",
        }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {!confirmLogin ? (
          <TextField
            id="outlined-basic"
            label="输入邮箱"
            type="email"
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "10px",
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            {...register("email", {
              required: "请输入邮箱!",
              pattern: {
                value: emailRegExp,
                message: "邮箱格式不正确，请重新输入!",
              },
            })}
          />
        ) : (
          <>
            <TextField
              id="outlined-basic"
              type="email"
              label="请输入邮箱验证码"
              variant="outlined"
              sx={{
                width: "100%",
              }}
            />
            <HelperText />
          </>
        )}

        <Button
          variant="contained"
          sx={{
            width: "100%",
          }}
          type="submit"
        >
          {btnText}
        </Button>
      </form>

      <div className="text-[12px] w-full flex justify-center items-center">
        {!confirmLogin ? (
          <p>
            {tipPrefix}{" "}
            <Link to={url} className="text-blue-500 no-underline">
              {tipSuffix} {">"}
            </Link>
          </p>
        ) : (
          <div className="w-3/4 flex justify-around items-center gap-36">
            <div className="text-[#2E9CEE] cursor-pointer">更改邮箱</div>
            <div className="flex justify-center items-center gap-1">
              没有收到验证码?{" "}
              <a className="text-[#2E9CEE] cursor-pointer">重发</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthComponent;
