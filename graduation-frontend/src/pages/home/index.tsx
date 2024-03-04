import type { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Logo from "@/assets/img/logo.jpg";
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
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#0D0D0D",
            height: "110vh",
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
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            backgroundColor: "#252525",
            height: "110vh",
          }}
        >
          right
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
