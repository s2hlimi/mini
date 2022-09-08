import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("Authorization"); //로그아웃은 token, username 제거
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("nickname");
    },
  },

  extraReducers: {
    
  },
});

export default userSlice;
