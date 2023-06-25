import { createSlice } from "@reduxjs/toolkit";

const StockDetailSlice = createSlice({
  name: "stocks",
  initialState: {
    indices: [],
    error: false,
    isLoading: true,
  },
  reducers: {
    GetIndicesStart: (state, action) => {
      state.isLoading = true;
    },
    GetIndicesSuccess: (state, action) => {
      state.isLoading = false;
      state.indices = action.payload;
    },
    GetIndicesFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { GetIndicesStart, GetIndicesSuccess, GetIndicesFailed } =
  StockDetailSlice.actions;

export default StockDetailSlice.reducer;
