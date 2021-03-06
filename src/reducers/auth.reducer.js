import { authConstants, userConstants } from "../constants";

const initialState = {
  token: null,
  user: {},
  permissions: [],
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

const authReducer = (state = initialState, action) => {
  console.log("::::::::::::::::::::>>>>>>> Auth Action", action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      const { user, token } = action.payload;
      state = {
        ...state,
        user: user,
        permissions: user.role.permissions,
        token: token,
        loading: false,
        authenticated: true,
        authenticating: false,
        message: "user Login successfully",
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      const { error, message } = action.payload;
      state = {
        ...initialState,
        error: error,
        message: message,
      };
      break;
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: "signUp successfully",
        loading: false,
      };
      break;
    default:
      break;
  }
  return state;
};

export default authReducer;
