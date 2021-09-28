import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Appointment from "../pages/Appointment";
import UserList from "../pages/UserList";

import NavBar from "../ui/NavBar";

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/appointment" component={Appointment} />
        <ProtectedRoute path="/userlist" component={UserList} />
      </Switch>
    </Router>
  );
};

export default Routes;
