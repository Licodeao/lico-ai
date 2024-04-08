import { FormControl, TextField, Button } from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Profile: FC<IProps> = () => {
  return (
    <FormControl className="flex flex-col gap-3">
      <span className="text-[20px]">个人信息</span>

      <div className="flex flex-col gap-2">
        <span className="text-[#949494] text-lg">用户名</span>
        <div className="flex flex-row justify-center items-center gap-2">
          <TextField label="用户名" size="small" />
          <Button type="submit" variant="contained">
            保存
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#949494] text-lg">邮箱</span>
        <div className="flex flex-row justify-center items-center gap-2">
          <TextField label="邮箱" size="small" />
          <Button type="submit" variant="contained">
            保存
          </Button>
        </div>
      </div>
    </FormControl>
  );
};

export default Profile;
