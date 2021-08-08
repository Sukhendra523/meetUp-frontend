import { authConstants, userConstants } from "../constants";
import axios from "../helper/axios";

export const facebookLogin = (response) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const { accessToken, userId } = response;
      const res = await axios.post("/facebookLogin", { accessToken, userId });
      console.log("user sigin successfilly", res);
      if (res.status === 200 || res.status === 201) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      } else {
        const { error, message } = res.data;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error, message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const googleLogin = (idToken) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/googleSignin", { idToken: idToken });
      console.log("user sigin successfilly", res);
      if (res.status === 200 || res.status === 201) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      } else {
        const { error, message } = res.data;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error, message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      const res = await axios.post(`/signin`, user);

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
      if (res.status === 403) {
        const { error, message } = res.data;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error, message },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    try {
      const res = await axios.post(`/signup`, user);

      if (res.status === 201) {
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
        });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
      if (res.status === 403) {
        const { error, message } = res.data;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error, message },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { message: error.message },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "failed to login" },
      });
    }
  };
};
