import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../buttons/login-button";
import { LogoutButton } from "../buttons/logout-button";
import { SignupButton } from "../buttons/signup-button";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        YourBrand
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <SignupButton />
              </li>
              <li className="nav-item">
                <LoginButton />
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/app" className="nav-link">
                  App
                </Link>
              </li>
              <li className="nav-item">
                <LogoutButton />
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
