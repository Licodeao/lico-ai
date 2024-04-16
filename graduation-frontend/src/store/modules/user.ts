import { createSlice } from "@reduxjs/toolkit";

interface UserInfoItem {
  username: string;
  email: string;
  role: string;
  image_url: string;
}

interface UserInfo {
  userInfo: UserInfoItem[];
  btnStatus: {
    username: boolean;
    email: boolean;
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    btnStatus: {
      username: true,
      email: true,
    },
  } as UserInfo,
  reducers: {
    changeUserInfoAction(state, { payload }) {
      state.userInfo.push(payload);
    },
    changeUserAccountInfoAction(state, { payload }) {
      const { key, value } = payload;
      state.userInfo[0][key] = value;
    },
    changeProfileBtnStatusAction(state, { payload }) {
      const { key, value } = payload;
      state.btnStatus[key] = value;
    },
  },
});

export const {
  changeUserInfoAction,
  changeUserAccountInfoAction,
  changeProfileBtnStatusAction,
} = userSlice.actions;
export default userSlice.reducer;
