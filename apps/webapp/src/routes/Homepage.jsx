import LoginButton from "../components/buttons/login-button";
import { LogoutButton } from "../components/buttons/logout-button";
import { SignupButton } from "../components/buttons/signup-button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "../components/website/HomePage.css";
import NavBar from "../components/website/NavBar";

export default function HomePage() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div>
        <h1>Top</h1>
      </div>
      <NavBar />
      <div className="center">
        <div className="content">
          <h1>Welcome to Chainscan!</h1>
          <h2>The Zapier for Web3</h2>
          <p>
            Check out the project{" "}
            <a href="https://github.com/EthWiz/chainscan">Github</a>
          </p>
          <div>
            <Link to="/app">
              <button className="btn btn-primary">Go to App</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
