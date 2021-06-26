import { userConstants } from "../constants";
import axios from "../helper/axios";

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USER_REQUEST });
    try {
      const res = await axios.get("/users");
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_ALL_USER_SUCCESS,
          payload: { users: res.data },
        });
      } else {
        dispatch({
          type: userConstants.GET_ALL_USER_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUserDetails = (id) => {
  console.log("Details");
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_DETAILS_REQUEST });
    try {
      const res = await axios.get(`/user/getUserDetails/${id}`);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_USER_DETAILS_SUCCESS,
          payload: { user: res.data },
        });
      } else {
        dispatch({
          type: userConstants.GET_USER_DETAILS_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateUser = (user, id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    try {
      const res = await axios.put(`/user/update/${id}`, user);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.UPDATE_USER_SUCCESS,
          payload: { message: res.data.message },
        });
      } else {
        dispatch({
          type: userConstants.UPDATE_USER_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    try {
      const res = await axios.delete(`/user/delete/${id}`);
      console.log("data delete", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.DELETE_USER_SUCCESS,
          payload: { message: res.data.message },
        });
      } else {
        dispatch({
          type: userConstants.DELETE_USER_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchUsers = (query) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.SEARCH_USER_REQUEST });
    try {
      const res = await axios.get(`/users/search/${query}`);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.SEARCH_USER_SUCCESS,
          payload: { users: res.data },
        });
      } else {
        dispatch({
          type: userConstants.SEARCH_USER_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateProfile = (formData, id) => {
  console.log("formdata", formData);
  return async (dispatch) => {
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    try {
      const res = await axios.put(`/user/updateProfile/${id}`, formData);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: userConstants.UPDATE_USER_SUCCESS,
          payload: { message: res.data.message },
        });
      } else {
        dispatch({
          type: userConstants.UPDATE_USER_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
