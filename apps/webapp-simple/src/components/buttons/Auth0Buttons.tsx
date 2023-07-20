import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = ({ className = "" }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/callback",
      },
    });
  };

  return (
    <button className={`btn ${className}`} onClick={handleLogin}>
      Log In
    </button>
  );
};

export const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className={`btn ${className}`} onClick={handleLogout}>
      Log Out
    </button>
  );
};

export const SignupButton = ({ className = "" }) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/callback",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className={`btn ${className}`} onClick={handleSignUp}>
      Sign Up
    </button>
  );
};
