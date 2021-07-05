import { featureConstants } from "../constants";

const initialState = {
  features: [],
  loading: false,
  message: "",
};

const featureReducer = (state = initialState, action) => {
  console.log("::::::::::::::::::::>>>>>>> RoleReducer", action);
  const { type, payload } = action;
  switch (type) {
    case featureConstants.GET_ALL_FEATURE_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Loading Please Wait",
      };
      break;
    case featureConstants.GET_ALL_FEATURE_SUCCESS:
      state = {
        ...state,
        features: payload.features,
        loading: false,
        message: "Get ALL feature Success",
      };
      break;
    case featureConstants.GET_ALL_FEATURE_FAILURE:
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

export default featureReducer;
