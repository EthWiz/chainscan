import { Link } from "react-router-dom";
import "./HomeNav.css";
export const HomeNav = () => {
  return (
    <div className="nav-bar">
      <div>
        <img
          className="logo"
          src="https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-750x750.webp"
          alt="logo"
        />
      </div>
      <div className="nav-links">
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="alerts">
          Alerts
        </Link>
      </div>
    </div>
  );
};
