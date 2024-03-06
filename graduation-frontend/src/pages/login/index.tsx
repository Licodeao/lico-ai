import type { FC, ReactNode } from "react";
import AuthComponent from "@/components/authComponent";

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  return (
    <AuthComponent
      btnText="使用邮箱登录"
      tipPrefix="还没有账号了?"
      tipSuffix="去注册"
      url="/signup"
    />
  );
};

export default Login;
