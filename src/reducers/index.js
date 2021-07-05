import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import featureReducer from "./feature.reducer";
import meetingReducer from "./meeting.reducer";
import roleReducer from "./role.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  meeting: meetingReducer,
  feature: featureReducer,
});

export default rootReducer;
