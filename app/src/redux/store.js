import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import StockDetailSlice from "./StockDetailsSlice";

export const Store = configureStore({
  reducer: {
    users: UserSlice,
    stocks: StockDetailSlice,
  },
});
