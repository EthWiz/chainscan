import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../components/PageLoader";
import "./DashboardLayout.css";
const DashboardLayout = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <>
      <div id="sidebar">
        <nav>
          <h1>
            <Link to={"/"}>Chainscan</Link>
          </h1>
          <ul>
            <li>
              <Link to={`/app/`}>Create Alert</Link>
            </li>
            <li>
              <Link to={`/app/alerts`}>My Alerts</Link>
            </li>
            <li>
              <div id="telegramBtn"></div>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
