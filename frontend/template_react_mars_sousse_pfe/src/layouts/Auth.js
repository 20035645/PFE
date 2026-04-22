import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views
import Login    from "views/auth/Login.js";
import forget   from "views/auth/forget";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <Switch>
      <Route path="/auth/login"    exact component={Login}    />
      <Route path="/auth/forget"   exact component={forget}   />
      <Route path="/auth/register" exact component={Register} />
      <Redirect from="/auth" to="/auth/login" />
    </Switch>
  );
}