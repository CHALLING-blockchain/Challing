import { createSlice } from "@reduxjs/toolkit";
//import {} from "./UserAPI";
const initialState = {
  userInfo: {},
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNickName: (state, action) => {
      state.userInfo.nickname = action.payload;
    },
    setInterests: (state, action) => {
      state.userInfo.interests = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserInfo, setToken, setNickName } = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
