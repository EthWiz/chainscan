import LoginButton from "../components/buttons/login-button";
import { LogoutButton } from "../components/buttons/logout-button";
import { SignupButton } from "../components/buttons/signup-button";
import { useAuth0 } from "@auth0/auth0-react";
export default function HomePage() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h1>This is the home page!</h1>
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
}
