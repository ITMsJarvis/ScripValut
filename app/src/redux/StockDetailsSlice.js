import { createSlice } from "@reduxjs/toolkit";

const StockDetailSlice = createSlice({
  name: "stocks",
  initialState: {
    indices: [],
    fiftyTwoWeekHighData: [],
    fiftyTwoWeekLowData: [],
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

    GetFiftyTwoweekDataStart: (state, action) => {
      state.isLoading = true;
    },
    GetFiftyTwoweekDataSuccess: (state, action) => {
      state.isLoading = false;

      if (action.payload.type === "high") {
        state.fiftyTwoWeekHighData = action.payload.data;
      } else {
        state.fiftyTwoWeekLowData = action.payload.data;
      }
    },
    GetFiftyTwoweekDataFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  GetIndicesStart,
  GetIndicesSuccess,
  GetIndicesFailed,
  GetFiftyTwoweekDataStart,
  GetFiftyTwoweekDataSuccess,
  GetFiftyTwoweekDataFailed,
} = StockDetailSlice.actions;

export default StockDetailSlice.reducer;
