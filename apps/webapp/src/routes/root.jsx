import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute('data-telegram-login', import.meta.env.VITE_BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'AUTH_URL');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.getElementById('telegramBtn').appendChild(script);
  }, []);

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
}
