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

// ✅ Helper — lit le user depuis localStorage
function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

// ✅ Route protégée par token uniquement
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

// ✅ Route protégée par rôle
function RoleRoute({ component: Component, roles, ...rest }) {
  const token = localStorage.getItem("token");
  const user = getUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Pas connecté → login
        if (!token || !user) {
          return <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />;
        }
        // Connecté mais mauvais rôle → page d'accueil
        if (!roles.includes(user.role)) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

ReactDOM.render(
  <BrowserRouter>
    <GymChatWidget />
    <Switch>
      {/* ✅ Admin — seulement role: 'admin' */}
      <RoleRoute path="/admin" component={Admin} roles={["admin"]} />

      {/* ✅ Coach — seulement role: 'coach' */}
      <RoleRoute path="/coach" component={Coach} roles={["coach"]} />

      {/* Auth — toujours accessible */}
      <Route path="/auth" component={Auth} />

      {/* Pages publiques */}
      <Route path="/" exact component={Index} />
      <Route path="/newpage" component={NewPage} />

      {/* Pages privées — connecté peu importe le rôle */}
      <PrivateRoute path="/landing" component={Landing} />
      <PrivateRoute path="/profile" component={Profile} />

      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);