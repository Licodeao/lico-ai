import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  const { handleSubmit, register, formState } = useForm<FormValue>({
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;

  const emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  const onSubmit = (data: FormValue) => {
    console.log(data);
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
