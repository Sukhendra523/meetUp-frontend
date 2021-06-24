import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getAllUsers, isUserLoggedIn } from "./actions";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Meeting from "./components/meeting/meeting";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import UserList from "./components/pages/Users/UserList";
import EditUser from "./components/pages/Users/EditUser";
import MeetingsList from "./components/pages/MeetingsList";
import RoleList from "./components/pages/RoleList";
import MeetingFeatures from "./components/pages/MeetingFeatures";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [auth]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [auth]);
  return (
    <div className="">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <PrivateRoute path="/meeting" component={Meeting} />
          <PrivateRoute path="/meetings" component={MeetingsList} />
          <PrivateRoute path="/roles" component={RoleList} />
          <PrivateRoute path="/features" component={MeetingFeatures} />
          <PrivateRoute path="/users" component={UserList} />
          <PrivateRoute path="/user/:id" component={EditUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
