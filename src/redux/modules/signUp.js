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
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
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
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},

  extraReducers: {
    
  },
});

export default signupSlice;
