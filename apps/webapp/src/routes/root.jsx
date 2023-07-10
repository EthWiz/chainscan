import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
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
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }