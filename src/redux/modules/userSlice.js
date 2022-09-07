import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  nickname: "nicknamer",
  initialState: {
    nickname: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("Authorization"); //로그아웃은 token, username 제거
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("nickname");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
