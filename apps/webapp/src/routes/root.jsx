import { Outlet, Link } from "react-router-dom";
import { NavBarButtons } from "../components/NavBarButtons";
import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate";
export default function Root() {
  return (
    <>
      {/* <Auth0ProviderWithNavigate> */}
      <div id="sidebar">
        <nav>
          <h1>Chainscan</h1>
          <NavBarButtons />
          <ul>
            <li>
              <Link to={`/app/create-alert`}>Create Alert</Link>
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
      {/* </Auth0ProviderWithNavigate> */}
    </>
  );
}
