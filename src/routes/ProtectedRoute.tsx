import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const { component: Component, user, ...res } = props;

  const token = localStorage.getItem("@$token");
 
  return (
    <Route
      {...res}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
