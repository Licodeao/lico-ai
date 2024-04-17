import Member from "@/components/member";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { Button, FormControl, TextField } from "@mui/material";
import type { FC, ReactNode } from "react";
import { shallowEqual } from "react-redux";

interface IProps {
  children?: ReactNode;
}

const AccountSetting: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state) => ({
      user: state.user.userInfo,
    }),
    shallowEqual
  );

  return (
    <div className="flex flex-col gap-16">
      <FormControl className="flex flex-col gap-3">
        <span className="text-[20px]">工作空间设置</span>
        <div className="flex flex-row justify-start items-center gap-3">
          <TextField
            value={user[0].team[0].name}
            size="small"
            sx={{
              width: "30%",
            }}
          />
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
          <TextField
            label="在这里输入邮箱"
            size="small"
            sx={{
              width: "30%",
            }}
          />
          <Button type="submit" variant="contained">
            邀请
          </Button>
        </div>

        <div className="text-sm text-[#93959D]">当前团队成员</div>
        <div className="flex flex-col gap-2">
          {user[0].team[0].members.length === 0 ? (
            <div>当前团队没有成员</div>
          ) : (
            user[0].team[0].members.map((m) => {
              return (
                <Member
                  key={m.username}
                  username={m.username}
                  url={m.image_url}
                  email={m.email}
                  role={user[0].team[0].isAdmin}
                />
              );
            })
          )}
        </div>
      </FormControl>
    </div>
  );
};

export default AccountSetting;
