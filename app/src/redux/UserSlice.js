import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userid: "",
    name: "",
    username: "",
    email: "",
    mobileNumber: [],
    address: [],
    error: false,
    isLoading: false,
    errorList: [],
    serverMessage: "",
  },

  reducers: {
    RegisterUserStart: (state, action) => {
      state.isLoading = true;
    },

    RegisterUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.serverMessage = action.payload;
    },

    RegisterUserFailed: (state, action) => {
      state.error = true;
      state.errorList = action.payload;
      state.isLoading = false;
    },

    LoginUserStart: (state, action) => {
      state.isLoading = true;
    },

    LoginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.userid = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.address = action.payload.address;
      state.mobileNumber = action.payload.mobileNumber;
    },

    LoginUserFailed: (state, action) => {
      state.error = true;
      state.errorList = action.payload;
      state.isLoading = false;
    },

    ClearErrorList: (state, action) => {
      state.errorList = [];
    },
  },
});

export const {
  RegisterUserStart,
  RegisterUserSuccess,
  RegisterUserFailed,
  LoginUserStart,
  LoginUserSuccess,
  LoginUserFailed,
  ClearErrorList,
} = UserSlice.actions;

export default UserSlice.reducer;
