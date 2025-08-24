import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import merchantReducer from "./slices/merchantSlice";
import memberReducer from "./slices/memberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    merchant: merchantReducer,
    member: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
