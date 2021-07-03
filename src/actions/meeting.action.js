import { meetingConstants } from "../constants";
import axios from "../helper/axios";

export const getAllMeetings = () => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.GET_ALL_MEETING_REQUEST });
    try {
      const res = await axios.get("/meetings");
      const { message, meetings } = res.data;
      if (res.status === 200) {
        dispatch({
          type: meetingConstants.GET_ALL_MEETING_SUCCESS,
          payload: { meetings },
        });
      } else {
        dispatch({
          type: meetingConstants.GET_ALL_MEETING_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateMeeting = (meeting, id) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.UPDATE_MEETING_REQUEST });
    try {
      const res = await axios.put(`/meeting/update/${id}`, meeting);
      console.log("data", res.data);
      const { message } = res.data;

      if (res.status === 200) {
        dispatch({
          type: meetingConstants.UPDATE_MEETING_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: meetingConstants.UPDATE_MEETING_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteMeeting = (id) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.DELETE_MEETING_REQUEST });
    try {
      const res = await axios.delete(`/meeting/delete/${id}`);
      console.log("data delete😁😁😁😀", res.data);
      const { message } = res.data;

      if (res.status === 200) {
        dispatch({
          type: meetingConstants.DELETE_MEETING_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: meetingConstants.DELETE_MEETING_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchUsers = (query) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.SEARCH_MEETING_REQUEST });
    try {
      const res = await axios.get(`/meetings/search/${query}`);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: meetingConstants.SEARCH_MEETING_SUCCESS,
          payload: { meetings: res.data },
        });
      } else {
        dispatch({
          type: meetingConstants.SEARCH_MEETING_FAILURE,
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
    dispatch({ type: meetingConstants.UPDATE_MEETING_REQUEST });
    try {
      const res = await axios.put(`/meeting/updateProfile/${id}`, formData);
      console.log("data", res.data);
      if (res.status === 200) {
        dispatch({
          type: meetingConstants.UPDATE_MEETING_SUCCESS,
          payload: { message: res.data.message },
        });
      } else {
        dispatch({
          type: meetingConstants.UPDATE_MEETING_FAILURE,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
