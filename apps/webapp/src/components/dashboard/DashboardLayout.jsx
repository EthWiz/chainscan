import { Outlet, Link } from "react-router-dom";
import Auth0ProviderWithNavigate from "../../routes/auth0-provider-with-navigate";
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Auth0ProviderWithNavigate>
        <div id="sidebar">
          <nav>
            <h1>Chainscan</h1>
            <ul>
              <li>
                <Link to={`/create-alert`}>Create Alert</Link>
              </li>
              <li>
                <Link to={`/alerts`}>My Alerts</Link>
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
      </Auth0ProviderWithNavigate>
    </>
  );
};

export default DashboardLayout;
