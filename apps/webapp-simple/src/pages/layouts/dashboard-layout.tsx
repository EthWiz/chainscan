import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./dashboard-layout.css";

const DashboardLayout = () => {
  return (
    <div className="d-flex" id="wrapper">
      <nav className="nav bg-dark text-white border-right" id="sidebar-wrapper">
        <div className="container-fluid d-flex flex-column gap-3">
          <Link className="navbar-brand mt-4" to="/">
            <img
              className="logo"
              style={{ width: "50px", height: "50px" }}
              src="https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-750x750.webp"
              alt="logo"
            />
            Chainscan
          </Link>
          <div className="nav navbar-nav p-3 d-flex flex-column gap-3">
            <button className="btn btn-outline-primary text-white ">
              <Link className="nav-link active " to="./">
                Alerts
              </Link>
            </button>
            <button className="btn btn-outline-primary text-white ">
              <Link className="nav-link" to="create-alert">
                Create Alert
              </Link>
            </button>
            <button className="btn btn-outline-primary text-white ">
              <Link className="nav-link" to="destinations">
                Destinations
              </Link>
            </button>
          </div>
        </div>
      </nav>
      <div id="page-content-wrapper">
        <div className="container-fluid py-4 px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
