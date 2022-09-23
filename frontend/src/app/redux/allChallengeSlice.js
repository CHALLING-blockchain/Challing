import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  challengeList: {},
};

export const allChallengeSlice = createSlice({
  name: "challengeList",
  initialState,
  reducers: {
    setChallengeList: (state, action) => {
      state.challengeList = action.payload;
    },
  },
});

export const { setChallengeList } = allChallengeSlice.actions;
export const challengeList = (state) => state.challengeList.setChallengeList;

export default allChallengeSlice.reducer;
