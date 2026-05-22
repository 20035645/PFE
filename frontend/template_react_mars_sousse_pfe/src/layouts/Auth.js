import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "views/auth/Login.js";
import forget from "views/auth/forget";
import Register from "views/auth/Register.js";

/** Auth pages ship their own full-screen GymAccess UI — no Notus wrapper */
export default function Auth() {
  return (
    <Switch>
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/forget" exact component={forget} />
      <Route path="/auth/register" exact component={Register} />
      <Redirect from="/auth" to="/auth/login" />
    </Switch>
  );
}
