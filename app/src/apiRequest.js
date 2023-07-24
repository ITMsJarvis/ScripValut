import axios from "axios";
import jwtdecode from "jwt-decode";

const accessToken = localStorage.getItem("accessToken");

const refreshToken = localStorage.getItem("refreshToken");

export const publicRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const userRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const GenerateRefreshToken = async (req, res) => {
  try {
    const res = await publicRequest.post("/user_auth/refreshToken", {
      refreshToken,
    });

    const NewAccessToken = res.data.NewAccessToken;

    const NewRefreshToken = res.data.NewRefreshToken;

    localStorage.setItem("accessToken", NewAccessToken);

    localStorage.setItem("refreshToken", NewRefreshToken);

    return { NewAccessToken, NewRefreshToken };
  } catch (e) {
    console.log(e);
  }
};

userRequest.interceptors.request.use(
  async (config) => {
    try {
      const currentTime = new Date().getTime();

      const token = jwtdecode(accessToken);

      if (token.exp * 1000 < currentTime) {
        const data = await GenerateRefreshToken();
        console.log(data);

        config.headers["token"] = `Bearer ${data?.NewAccessToken}`;
      } else {
        config.headers["token"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (e) {
      console.log(e);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
