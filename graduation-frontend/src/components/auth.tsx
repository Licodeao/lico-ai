import {
  useState,
  useMemo,
  type FC,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useFormControl } from "@mui/material/FormControl";
import { ResendEmail, postLoginEmail } from "@/service/modules/mail";
import { login } from "@/service/modules/user";
import { useAppDispatch } from "@/store/storeHook";
import { changeUserInfoAction } from "@/store/modules/user";

interface IProps {
  children?: ReactNode;
  btnText: string;
  tipPrefix: string;
  tipSuffix: string;
  url: string;
}

interface FormValue {
  email: string;
  validateCode: string;
}

const AuthComponent: FC<IProps> = ({ btnText, tipPrefix, tipSuffix, url }) => {
  const [confirmLogin, setConfirmLogin] = useState<boolean>(false);
  const [isSendEmailCode, setIsSendEmailCode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [emailOpen, setEmailOpen] = useState<boolean>(false);
  const [resendOpen, setResendOpen] = useState<boolean>(false);
  const { handleSubmit, register, formState } = useForm<FormValue>({
    defaultValues: {
      email: "",
      validateCode: "",
    },
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  const onSubmit = (data: FormValue) => {
    const { email, validateCode } = data;

    localStorage.setItem("email", email);

    if (!isSendEmailCode) {
      postLoginEmail(email).then((res) => {
        if (res.code === 200) {
          setEmailOpen(true);
        }
      });
    }

    if (validateCode) {
      login(email, validateCode).then((res) => {
        if (res.code === 401) {
          setOpen(true);
        } else if (res.code === 200) {
          setSuccessOpen(true);
          const { access_token, refresh_token, user } = res as any;
          localStorage.setItem("access_token", access_token!);
          localStorage.setItem("refresh_token", refresh_token!);
          dispatch(changeUserInfoAction(user));
          navigate("/workspace");
        }
      });
    }

    setIsSendEmailCode(true);
    setConfirmLogin(true);
  };

  const HelperTip = () => {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (focused) {
        return "focused";
      }

      return "请在您的邮箱查看我发的邮件!";
    }, [focused]);

    return <div className="text-[12px] text-[#85C027] my-2">{helperText}</div>;
  };

  const handleEmailClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailOpen(false);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSuccessClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleRensendClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setResendOpen(false);
  };

  const handleChangeEmail = () => {
    setConfirmLogin(false);
  };

  const handleResendCode = () => {
    const email = localStorage.getItem("email")!;

    ResendEmail(email).then((res) => {
      if (res.code === 200) {
        setResendOpen(true);
      }
    });
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
              type="input"
              label="请输入邮箱验证码"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: "10px",
              }}
              error={!!errors.validateCode}
              helperText={errors.validateCode?.message}
              required
              {...register("validateCode", {
                required: "请输入邮箱验证码!",
                pattern: {
                  value: /^\d{6}$/,
                  message: "验证码格式不正确，请重新输入!",
                },
              })}
            />
            <HelperTip />
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

        <Snackbar
          open={emailOpen}
          autoHideDuration={3000}
          onClose={handleEmailClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="success" variant="filled" onClose={handleEmailClose}>
            邮箱验证码已发送, 请查收!
          </Alert>
        </Snackbar>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="error" variant="filled" onClose={handleClose}>
            邮箱验证码校验错误!
          </Alert>
        </Snackbar>

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={handleSuccessClose}
          >
            校验通过, 登录成功!
          </Alert>
        </Snackbar>

        <Snackbar
          open={resendOpen}
          autoHideDuration={3000}
          onClose={handleRensendClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={handleRensendClose}
          >
            邮箱验证码已重发, 请查收!
          </Alert>
        </Snackbar>
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
          <div className="w-[85%] flex justify-around items-center gap-36">
            <div
              className="text-[#2E9CEE] cursor-pointer"
              onClick={handleChangeEmail}
            >
              更改邮箱
            </div>
            <div className="flex justify-center items-center gap-1">
              没有收到验证码?{" "}
              <a
                className="text-[#2E9CEE] cursor-pointer"
                onClick={handleResendCode}
              >
                重发
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthComponent;
