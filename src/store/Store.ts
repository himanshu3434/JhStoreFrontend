import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import filterSlice from "../features/filterSlice";
export const Store = configureStore({
  reducer: {
    auth: authSlice,
    filter: filterSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
