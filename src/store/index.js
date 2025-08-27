import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import adminReducer from "./slices/adminSlice.js";
import merchantReducer from "./slices/merchantSlice.js";
import memberReducer from "./slices/memberSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    merchant: merchantReducer,
    member: memberReducer,
  },
});
