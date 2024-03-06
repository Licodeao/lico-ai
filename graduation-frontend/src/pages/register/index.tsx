import { type FC, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Logo from "@/assets/img/logo.jpg";
import TwitterSvg from "@/assets/img/twitter.svg";
import GithubSvg from "@/assets/img/github.svg";
import GiteeSvg from "@/assets/img/gitee.svg";
import Pill from "@/components/pill";
import AuthComponent from "@/components/authComponent";
import Login from "@/pages/login/index";

interface IProps {
  children?: ReactNode;
}

const Register: FC<IProps> = () => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          margin: "0",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#0D0D0D",
            height: "100vh",
            padding: "0 20px !important",
          }}
        >
          <div className="text-white flex flex-row justify-start items-center gap-3 mt-5 p-5">
            <img src={Logo} alt="logo" className="rounded-full w-9 h-9" />
            <span className="text-xl font-black">哩叩 AI</span>
          </div>
          <div className="w-full h-4/5 text-white flex flex-col justify-center items-center gap-3">
            <div className="text-5xl font-black">
              欢迎来到 ·{" "}
              <span className="bg-gradient-to-tr from-purple-600 via-blue-500 to-green-400 bg-clip-text text-transparent">
                哩叩AI
              </span>
            </div>
            <div className="w-4/5 flex flex-col gap-4">
              <div className="w-full mt-5 flex flex-col justify-center items-center gap-5">
                <Pill
                  src={TwitterSvg}
                  alt="twitter"
                  style={{ marginRight: "8px" }}
                  text="使用 Twitter 登录"
                />
                <Pill
                  src={GithubSvg}
                  alt="github"
                  style={{ marginRight: "8px" }}
                  text="使用 Github 登录"
                />
                <Pill
                  src={GiteeSvg}
                  alt="gitee"
                  style={{ marginRight: "12px" }}
                  text="使用 Gitee 登录"
                />
              </div>
            </div>
            <div className="text-sm text-[#6E6E6E]">—— 或者 ——</div>
            {location.pathname === "/signup" ? (
              <AuthComponent
                btnText="创建账号"
                tipPrefix="已经有账号了?"
                tipSuffix="去登录"
                url="/login"
              />
            ) : (
              <Login />
            )}
          </div>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            backgroundColor: "#252525",
            height: "100vh",
            padding: "0px !important",
          }}
        >
          <video
            className="w-full
            h-full object-cover"
            autoPlay
            muted
            loop
          >
            <source
              src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/vedio.mp4"
              type="video/mp4"
            />
          </video>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
