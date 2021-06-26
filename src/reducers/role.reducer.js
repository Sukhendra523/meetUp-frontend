import { roleConstants } from "../constants";

const initialState = {
  roles: [],
  loading: false,
  message: "",
};

const roleReducer = (state = initialState, action) => {
  console.log("::::::::::::::::::::>>>>>>> RoleReducer", action);
  switch (action.type) {
    case roleConstants.GET_ALL_ROLE_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case roleConstants.GET_ALL_ROLE_SUCCESS:
      const { roles } = action.payload;
      state = {
        ...state,
        roles: roles,
        loading: false,
        message: "Get ALL role Success",
      };
      break;
    case roleConstants.GET_ALL_ROLE_FAILURE:
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

export default roleReducer;
