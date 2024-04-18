import { createSlice } from "@reduxjs/toolkit";

interface Limit {
  standardGenerateLimit: number;
  standardExportLimit: number;
  plusGenerateLimit: number;
  plusExportLimit: number;
}

type Members = Pick<UserInfoItem, "username" | "email" | "image_url">;
interface Team {
  id: number;
  name: string;
  isAdmin: true;
  members: Members[];
}

interface Albums {
  name: string;
  media: any[];
}

interface Permission {
  name: string;
}
interface Role {
  name: number;
  permissions: Permission[];
}

interface UserInfoItem {
  username: string;
  email: string;
  image_url: string;
  roles: Role[];
  albums: Albums[];
  team: Team[];
  limit: Limit;
}

interface UserInfo {
  userInfo: UserInfoItem[];
  btnStatus: {
    username: boolean;
    email: boolean;
    workspace: boolean;
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    btnStatus: {
      username: true,
      email: true,
      workspace: true,
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
    changeWorkspaceNameAction(state, { payload }) {
      state.userInfo[0].team[0].name = payload;
    },
    changeUsageStandardExportLimitAction(state, { payload }) {
      state.userInfo[0].limit.standardExportLimit = payload;
    },
    changeUsageStandardGenerateLimitAction(state, { payload }) {
      state.userInfo[0].limit.standardGenerateLimit = payload;
    },
    changeUsagePlusExportLimitAction(state, { payload }) {
      state.userInfo[0].limit.plusExportLimit = payload;
    },
    changeUsagePlusGenerateLimitAction(state, { payload }) {
      state.userInfo[0].limit.plusGenerateLimit = payload;
    },
  },
});

export const {
  changeUserInfoAction,
  changeUserAccountInfoAction,
  changeProfileBtnStatusAction,
  changeWorkspaceNameAction,
  changeUsageStandardExportLimitAction,
  changeUsageStandardGenerateLimitAction,
  changeUsagePlusGenerateLimitAction,
  changeUsagePlusExportLimitAction,
} = userSlice.actions;
export default userSlice.reducer;
