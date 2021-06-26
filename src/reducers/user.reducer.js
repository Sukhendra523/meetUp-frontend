import { userConstants } from "../constants";

const initialState = {
  users: [],
  user: {},
  loading: false,
  message: "",
  deleted: false,
  updated: false,
};

const userReducer = (state = initialState, action) => {
  console.log("::::::::::::::::::::>>>>>>>User Action", action);
  switch (action.type) {
    case userConstants.GET_ALL_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case userConstants.GET_ALL_USER_SUCCESS:
      const { users } = action.payload;
      state = {
        ...state,
        users: users,
        loading: false,
        message: "Get ALL user Success",
      };
      break;
    case userConstants.GET_ALL_USER_FAILURE:
      const { message } = action.payload;
      state = {
        ...initialState,
        message: message,
      };
      break;
    case userConstants.GET_USER_DETAILS_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case userConstants.GET_USER_DETAILS_SUCCESS:
      const { user } = action.payload;
      state = {
        ...state,
        user: user,
        loading: false,
        message: "Get user details Success",
      };
      break;
    case userConstants.GET_USER_DETAILS_FAILURE:
      state = {
        ...initialState,
        message: action.payload.message,
      };
      break;
    case userConstants.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case userConstants.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case userConstants.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case userConstants.DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        deleted: true,
        message: action.payload.message,
      };
      break;
    case userConstants.DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        deleted: false,
        message: action.payload.message,
      };
      break;

    case userConstants.SEARCH_USER_REQUEST:
      state = {
        ...state,
        message: "Loading Please Wait",
      };
      break;
    case userConstants.SEARCH_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: action.payload.users,
      };
      break;
    case userConstants.SEARCH_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    default:
      break;
  }
  return state;
};

export default userReducer;
