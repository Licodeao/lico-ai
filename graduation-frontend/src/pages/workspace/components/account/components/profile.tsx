import { update, updateAvatar } from "@/service/modules/user";
import {
  changeProfileBtnStatusAction,
  changeUserAccountInfoAction,
} from "@/store/modules/user";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { FormControl, TextField, Button, Avatar } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { shallowEqual } from "react-redux";

interface IProps {
  children?: ReactNode;
}

const Profile: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { user, btnStatus } = useAppSelector(
    (state) => ({
      user: state.user.userInfo,
      btnStatus: state.user.btnStatus,
    }),
    shallowEqual
  );

  const handleUsernameChange = (e) => {
    dispatch(
      changeUserAccountInfoAction({ key: "username", value: e.target.value })
    );
    dispatch(changeProfileBtnStatusAction({ key: "username", value: false }));
  };

  const handleEmailChange = (e) => {
    dispatch(
      changeUserAccountInfoAction({ key: "email", value: e.target.value })
    );
    dispatch(changeProfileBtnStatusAction({ key: "email", value: false }));
  };

  const handleAvatarChange = async (e) => {
    if (e.target.files[0]) {
      await updateAvatar(
        e.target.files[0],
        user[0].username,
        user[0].email
      ).then((res) => {
        dispatch(
          changeUserAccountInfoAction({ key: "image_url", value: res.url })
        );
      });
    }
  };

  const handleSaveUsername = async () => {
    await update("username", user[0].email, user[0].username);
    await dispatch(
      changeProfileBtnStatusAction({ key: "username", value: true })
    );
  };

  const handleSaveEmail = async () => {
    await update("email", user[0].username, user[0].email);
    await dispatch(changeProfileBtnStatusAction({ key: "email", value: true }));
  };

  return (
    <FormControl className="flex flex-col gap-3">
      <span className="text-[20px]">个人信息</span>

      <div className="flex flex-row justify-start items-center gap-10">
        <div
          style={{
            width: "15%",
            height: "15%",
          }}
        >
          <input
            type="file"
            id="avatar"
            accept=".jpg,.jpeg,.webp,.png"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar">
            <Avatar
              src={user[0].image_url}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "999px",
              }}
            />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[#949494] text-lg">用户名</span>
            <div className="flex flex-row justify-center items-center gap-2">
              <TextField
                size="small"
                value={user[0].username}
                onChange={handleUsernameChange}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={btnStatus.username}
                onClick={handleSaveUsername}
              >
                保存
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#949494] text-lg">邮箱</span>
            <div className="flex flex-row justify-center items-center gap-2">
              <TextField
                size="small"
                value={user[0].email}
                onChange={handleEmailChange}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={btnStatus.email}
                onClick={handleSaveEmail}
              >
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormControl>
  );
};

export default Profile;
