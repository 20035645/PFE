import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/index.css";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Coach from "layouts/Coach.js";

import Index from "views/Index.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import NewPage from "views/NewPage.js";
import GymChatWidget from "components/Chat/GymChatWidget.js";

// ✅ Composant PrivateRoute
// Remplace l'ancienne version par celle-ci
function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

ReactDOM.render(
  <BrowserRouter>
    <GymChatWidget />
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/coach" component={Coach} />
      <PrivateRoute path="/landing" component={Landing} /> {/* ✅ protégée */}
      <Route path="/profile" component={Profile} />
      <Route path="/newpage" component={NewPage} />
      <Route path="/" exact component={Index} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);