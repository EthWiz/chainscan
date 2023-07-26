import { Outlet } from "react-router-dom";
import "./dashboard-layout.css";
import Topbar from "../../components/dashboard/topbar/Topbar";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-light d-none d-md-block sidebar">
            <div className="left-sidebar">
              <Sidebar />
            </div>
          </div>
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
