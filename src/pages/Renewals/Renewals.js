import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AgGrid from "../../components/AgGrid";
export default function Renewals() {
  return (
    <div className="content">
      <h1 className="primary-heading">Renewals Overview</h1>
      <div className="renewals-tabs">
        <NavLink to="expiring" className="renewals-tab">
          Expiring
        </NavLink>
        <NavLink to="expired" className="renewals-tab">
          Expired
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
