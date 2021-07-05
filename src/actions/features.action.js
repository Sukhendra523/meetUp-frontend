import { featureConstants } from "../constants";
import axios from "../helper/axios";

export const getAllFeatures = () => {
  return async (dispatch) => {
    dispatch({ type: featureConstants.GET_ALL_FEATURE_REQUEST });
    try {
      const res = await axios.get("/features");
      const { message, features } = res.data;
      if (res.status === 200) {
        dispatch({
          type: featureConstants.GET_ALL_FEATURE_SUCCESS,
          payload: { features },
        });
      } else {
        dispatch({
          type: featureConstants.GET_ALL_FEATURE_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateFeature = (feature, id) => {
  return async (dispatch) => {
    dispatch({ type: featureConstants.UPDATE_FEATURE_REQUEST });
    try {
      const res = await axios.put(`/feature/update/${id}`, feature);
      console.log("data", res.data);
      const { message } = res.data;

      if (res.status === 200) {
        dispatch({
          type: featureConstants.UPDATE_FEATURE_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: featureConstants.UPDATE_FEATURE_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteFeature = (id) => {
  return async (dispatch) => {
    dispatch({ type: featureConstants.DELETE_FEATURE_REQUEST });
    try {
      const res = await axios.delete(`/feature/delete/${id}`);
      console.log("data delete😁😁😁😀", res.data);
      const { message } = res.data;

      if (res.status === 200) {
        dispatch({
          type: featureConstants.DELETE_FEATURE_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: featureConstants.DELETE_FEATURE_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
