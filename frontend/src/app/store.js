import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./redux/userSlice";
import allChallengeReducer from "./redux/allChallengeSlice";
import donationListReducer from "./redux/DonationListSlice";

const reducers = combineReducers({
  user: userReducer,
  challengeList: allChallengeReducer,
  donationList: donationListReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
