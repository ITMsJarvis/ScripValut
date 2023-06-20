import { useNavigate } from "react-router-dom";
import { publicRequest } from "../apiRequest";
import {
  LoginUserFailed,
  LoginUserStart,
  LoginUserSuccess,
  RegisterUserFailed,
  RegisterUserStart,
  RegisterUserSuccess,
} from "../redux/UserSlice";

export const RegisterUser = async (dispatch, user) => {
  dispatch(RegisterUserStart());

  try {
    const res = await publicRequest.post("/user_auth/user_register", user);

    if (res?.status == 200) {
      dispatch(RegisterUserSuccess("user registered"));
      window.location.href = "/login";
    }
  } catch (e) {
    if (e.message === "Network Error") {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Please check internet connection" },
        ])
      );
      return;
    }

    if (e.response.status === 403) {
      dispatch(RegisterUserFailed([...e.response.data.error]));
    } else if (e.response.status === 422) {
      dispatch(RegisterUserFailed(e.response.data.error));
    } else {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Something went wrong" },
        ])
      );
    }
  }
};

export const LoginUser = async (dispatch, user) => {
  dispatch(LoginUserStart());

  try {
    const res = await publicRequest.post("/user_auth/user_login", user);

    if (res.status == 200) {
      dispatch(LoginUserSuccess(res.data));

      const { accessToken, refreshToken, ...others } = res.data;

      localStorage.setItem("user", JSON.stringify({ ...others }));

      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);
    }
  } catch (e) {
    if (e.message === "Network Error") {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Please check internet connection" },
        ])
      );
      return;
    }

    if (e.response.status === 404) {
      dispatch(LoginUserFailed([{ path: "username", msg: e.response.data }]));
    } else if (e.response.status === 422) {
      console.log(e);
      dispatch(LoginUserFailed(e.response.data.error));
    } else if (e.response.status === 401) {
      console.log(e);
      dispatch(LoginUserFailed([{ path: "password", msg: e.response.data }]));
    } else {
      console.log(e);
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Something went wrong" },
        ])
      );
    }
  }
};
