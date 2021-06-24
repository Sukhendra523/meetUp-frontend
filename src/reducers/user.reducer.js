import { userConstants } from "../constants";

const initialState = {
  users: [],
  loading: false,
  message: "",
};

const userReducer = (state = initialState, action) => {
  console.log("::::::::::::::::::::>>>>>>>", action);
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
    default:
      break;
  }
  return state;
};

export default userReducer;
