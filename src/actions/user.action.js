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
