import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CoachDashboard from "views/coach/CoachDashboard.js";

export default function Coach() {

  return (
    <>
      <Switch>

        <Route
          path="/coach/dashboard"
          exact
          component={CoachDashboard}
        />

        <Redirect from="/coach" to="/coach/dashboard" />

      </Switch>
    </>
  );
}