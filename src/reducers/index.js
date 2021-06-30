import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import meetingReducer from "./meeting.reducer";
import roleReducer from "./role.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  meeting: meetingReducer,
});

export default rootReducer;
