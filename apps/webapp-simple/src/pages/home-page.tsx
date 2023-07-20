import { HomeNav } from "../components/home/HomeNav";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  LoginButton,
  SignupButton,
  LogoutButton,
} from "../components/buttons/Auth0Buttons.tsx";
const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <HomeNav />
      <div style={{ paddingTop: "20vh" }} className="container mx-auto">
        <div className="row">
          <div className="col-6">
            <h1 className="display-3">Welcome to Chainscan!</h1>
            <h2 className="lead text-muted">Open source project</h2>
          </div>
          <div className="col-6">
            <img
              className="hero-img"
              src="https://i.stack.imgur.com/b7TDL.jpg"
              alt="radar"
            />
          </div>
          <div>
            {!isAuthenticated && (
              <div className="p-4">
                <SignupButton className="btn-primary me-3" />
                <LoginButton className="btn-outline-primary" />
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
