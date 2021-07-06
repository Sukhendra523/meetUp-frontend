import { meetingConstants } from "../constants";
import axios from "../helper/axios";

export const getAllMeetings = () => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.GET_ALL_MEETING_REQUEST });
    try {
      const res = await axios.post("/meetings");
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

export const updateMeeting = (meetingData, id, createdBy) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.UPDATE_MEETING_REQUEST });
    try {
      const res = await axios.put(
        `/meeting/update/${id}/${createdBy}`,
        meetingData
      );
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

export const deleteMeeting = (id, createdBy) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.DELETE_MEETING_REQUEST });
    try {
      const res = await axios.delete(`/meeting/delete/${id}/${createdBy}`);
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

export const createMeeting = (meetingData) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.CREATE_MEETING_REQUEST });
    try {
      const res = await axios.post(`/meeting/create`, meetingData);
      console.log("data create meeting", res.data);
      const { message } = res.data;

      if (res.status === 201) {
        dispatch({
          type: meetingConstants.CREATE_MEETING_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: meetingConstants.CREATE_MEETING_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchMeeting = (query, email) => {
  return async (dispatch) => {
    dispatch({ type: meetingConstants.SEARCH_MEETING_REQUEST });
    try {
      const res = await axios.get(`/meeting/search/${query}/${email}`);
      console.log("data", res.data);
      const { message, meetings } = res.data;
      if (res.status === 200) {
        dispatch({
          type: meetingConstants.SEARCH_MEETING_SUCCESS,
          payload: { meetings },
        });
      } else {
        dispatch({
          type: meetingConstants.SEARCH_MEETING_FAILURE,
          payload: { message },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
