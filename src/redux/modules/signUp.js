import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  success: false,
};

export const __signUP = createAsyncThunk(
  "data/signup",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        "http://3.36.70.96:8080//api/signup",
        payload
      );
      console.log(data);
      if (data.data.success === false) alert(data.data.error.message);
      else alert("사용 가능한 아이디입니다.");
      if (data.data.success === false) alert(data.data.error.message);
      else alert("회원가입이 완료되었습니다.");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __checkId = createAsyncThunk(
  "data/checkId",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        "http://3.36.70.96:8080/api/signup",
        payload
      );
      console.log(data);
      if (data.data.success === false) alert(data.data.error.message);
      else alert("사용 가능한 아이디입니다.");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},

  extraReducers: {
    [__signUP.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__signUP.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__signUP.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default signupSlice;
