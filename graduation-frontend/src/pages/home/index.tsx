import type { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Logo from "@/assets/img/logo.jpg";
import GoogleSvg from "@/assets/img/google.svg";
import GithubSvg from "@/assets/img/github.svg";
import GiteeSvg from "@/assets/img/gitee.svg";
import "./index.css";

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
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
          <div className="logo">
            <img
              src={Logo}
              alt="logo"
              width={36}
              height={36}
              style={{
                borderRadius: "50%",
              }}
            />
            <span>哩叩 AI</span>
          </div>
          <div className="form-space">
            <div className="form-title">
              欢迎来到 · <span>哩叩AI</span>
            </div>
            <div className="form-content">
              <div className="other-login">
                <div className="login-pill">
                  <img
                    src={GoogleSvg}
                    alt="google"
                    style={{
                      marginRight: "5px",
                    }}
                  />{" "}
                  使用 Google 登录
                </div>
                <div className="login-pill">
                  <img
                    src={GithubSvg}
                    alt="github"
                    style={{
                      marginRight: "8px",
                    }}
                  />
                  使用 Github 登录
                </div>
                <div className="login-pill">
                  <img
                    src={GiteeSvg}
                    alt="gitee"
                    style={{
                      marginRight: "12px",
                    }}
                  />
                  使用 Gitee 登录
                </div>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "#6E6E6E" }}>—— 或者 ——</div>
            <TextField
              id="outlined-basic"
              label="输入邮箱"
              variant="outlined"
              sx={{
                width: "70%",
              }}
            />

            <Button
              variant="contained"
              sx={{
                width: "70%",
              }}
            >
              创建账号
            </Button>

            <div className="tip">
              <p>
                已经有账号了? <a href="/">去登录 {">"}</a>
              </p>
            </div>
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
            width="100%"
            height="100%"
            autoPlay
            // controls
            muted
            loop
            style={{
              objectFit: "cover",
            }}
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

export default Home;
