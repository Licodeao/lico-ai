import Member from "@/components/member";
import { Button, FormControl, TextField } from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const AccountSetting: FC<IProps> = () => {
  return (
    <div className="flex flex-col gap-16">
      <FormControl className="flex flex-col gap-3">
        <span className="text-[20px]">工作空间设置</span>
        <div className="flex flex-row justify-start items-center gap-3">
          <TextField label="你的空间名称" size="small" />
          <Button type="submit" variant="contained">
            保存
          </Button>
        </div>
      </FormControl>

      <FormControl className="flex flex-col gap-3">
        <span className="text-[20px]">发出邀请</span>
        <span className="text-xs text-[#959997]">
          邀请其他人成为团队成员，一起使用工作空间!
        </span>

        <div className="flex flex-row justify-start items-center gap-3">
          <TextField label="在这里输入邮箱" size="small" />
          <Button type="submit" variant="contained">
            邀请
          </Button>
        </div>

        <div className="text-sm text-[#93959D]">当前团队成员</div>
        <div className="flex flex-col gap-2">
          <Member />
        </div>
      </FormControl>
    </div>
  );
};

export default AccountSetting;
