import { roleConstants } from "../constants";
import axios from "../helper/axios";

export const getAllRoles = () => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_ROLE_REQUEST });
    try {
      const res = await axios.get("/roles");
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: roleConstants.GET_ALL_ROLE_SUCCESS,
          payload: { roles: res.data },
        });
      } else {
        dispatch({
          type: roleConstants.GET_ALL_ROLE_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
