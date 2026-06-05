import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Maps from "views/admin/Maps.js";
import Paiements from "views/admin/Paiements.js";

export default function Admin() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/members/getByStatus?status=pending")
      .then((r) => r.json())
      .then((data) => setPendingCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setPendingCount(0));
  }, []);

  return (
    <>
      <Sidebar pendingCount={pendingCount} />
      <div className="relative md:ml-64 gym-admin-page">
        <AdminNavbar />
        <HeaderStats />
        {/* ✅ Suppression du -m-24 qui causait l'espace vide */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/settings"  exact component={Settings} />
            <Route path="/admin/tables"    exact component={Tables} />
            <Route path="/admin/maps"      exact component={Maps} />
            <Route path="/admin/paiements" exact component={Paiements} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}