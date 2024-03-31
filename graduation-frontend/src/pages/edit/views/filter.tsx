import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, type FC, type ReactNode } from "react";
import React from "react";
import { Box, Typography } from "@mui/material";

interface IProps {
  children?: ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditFilter: FC<IProps> = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">滤镜</span>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="颜色"
              {...a11yProps(0)}
              sx={{
                width: "50%",
              }}
            />
            <Tab
              label="效果"
              {...a11yProps(1)}
              sx={{
                width: "50%",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          颜色
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          效果
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default EditFilter;
