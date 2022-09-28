import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  donationList: [],
};

export const allDonationSlice = createSlice({
  name: "donationList",
  initialState,
  reducers: {
    setDonationList: (state, action) => {
      state.donationList = action.payload;
    },
  },
});

export const { setDonationList } = allDonationSlice.actions;
export const donationList = (state) => state.donationList.donationList;

export default allDonationSlice.reducer;
