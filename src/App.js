import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isUserLoggedIn } from "./actions";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Meeting from "./components/meeting/meeting";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import UserList from "./components/pages/Users/UserList";
import AddUser from "./components/pages/Users/AddUser";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
  }, []);
  return (
    <div className="">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/meeting" component={Meeting}/>
          <Route path="/UserList" component={UserList}/>
          <Route path="/AddUser" component={AddUser}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
