import { createSlice } from "@reduxjs/toolkit";

interface UserInfoItem {
  username: string;
  email: string;
  role: string;
  image_url: string;
}

interface UserInfo {
  userInfo: UserInfoItem[];
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
  } as UserInfo,
  reducers: {
    changeUserInfoAction(state, { payload }) {
      state.userInfo.push(payload);
    },
  },
});

export const { changeUserInfoAction } = userSlice.actions;
export default userSlice.reducer;
