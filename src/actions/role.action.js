import { roleConstants } from "../constants";
import axios from "../helper/axios";

export const getAllRoles = () => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_ROLE_REQUEST });
    try {
      const res = await axios.get("/roles");
      console.log("data", res.data);
      const { roles, message } = res.data;

      if (res.status === 200) {
        dispatch({
          type: roleConstants.GET_ALL_ROLE_SUCCESS,
          payload: { roles },
        });
      } else {
        dispatch({
          type: roleConstants.GET_ALL_ROLE_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
