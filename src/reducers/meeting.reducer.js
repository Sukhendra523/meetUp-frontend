import { meetingConstants } from "../constants";

const initialState = {
  meetings: [],
  loading: false,
  message: "",
};

const meetingReducer = (state = initialState, action) => {
  console.log("meeting reducer ::", action);
  const { type, payload } = action;
  switch (type) {
    case meetingConstants.GET_ALL_MEETING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case meetingConstants.GET_ALL_MEETING_SUCCESS:
      state = {
        ...state,
        meetings: payload.meetings,
        loading: false,
        message: "Get ALl meeting success",
      };
      break;
    case meetingConstants.GET_ALL_MEETING_FAILURE:
      state = {
        ...initialState,
        message: payload.message,
      };
      break;

    case meetingConstants.SEARCH_MEETING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case meetingConstants.SEARCH_MEETING_SUCCESS:
      state = {
        ...state,
        meetings: payload.meetings,
        loading: false,
        message: "Get search success",
      };
      break;
    case meetingConstants.SEARCH_MEETING_FAILURE:
      state = {
        ...initialState,
        message: payload.message,
      };
      break;
    case meetingConstants.UPDATE_MEETING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case meetingConstants.UPDATE_MEETING_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: payload.message,
      };
      break;
    case meetingConstants.UPDATE_MEETING_FAILURE:
      state = {
        ...initialState,
        message: payload.message,
      };
      break;
    case meetingConstants.CREATE_MEETING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case meetingConstants.CREATE_MEETING_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: payload.message,
      };
      break;
    case meetingConstants.CREATE_MEETING_FAILURE:
      state = {
        ...initialState,
        message: payload.message,
      };
      break;
    case meetingConstants.DELETE_MEETING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case meetingConstants.DELETE_MEETING_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: payload.message,
      };
      break;
    case meetingConstants.DELETE_MEETING_FAILURE:
      state = {
        ...initialState,
        message: payload.message,
      };
      break;
    default:
      break;
  }
  return state;
};

export default meetingReducer;
