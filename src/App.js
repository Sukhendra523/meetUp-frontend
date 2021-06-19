import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/Register" component={Register}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
