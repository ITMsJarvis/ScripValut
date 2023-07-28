import { createSlice } from "@reduxjs/toolkit";

const MutualFundSlice = createSlice({
  name: "mutualFund",
  initialState: {
    MFList: JSON.parse(sessionStorage.getItem("Mflist")) || [],
    currentMF: {},
    error: false,
    isLoading: false,
  },
  reducers: {
    GetMFListStarted: (state, action) => {
      state.isLoading = true;
    },
    GetMFListSuccess: (state, action) => {
      (state.isLoading = false),
        (state.MFList = action.payload),
        (state.error = false);
    },
    GetMFListFailed: (state, action) => {
      (state.isLoading = true), (state.error = true);
    },

    GetCurrentMFStarted: (state, action) => {
      state.isLoading = true;
    },
    GetCurrentMFSuccess: (state, action) => {
      state.isLoading = false;
      state.currentMF = action.payload;
      state.error = false;
    },
    GetCurrentMFFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  GetMFListStarted,
  GetMFListSuccess,
  GetMFListFailed,
  GetCurrentMFStarted,
  GetCurrentMFSuccess,
  GetCurrentMFFailed,
} = MutualFundSlice.actions;

export default MutualFundSlice.reducer;
