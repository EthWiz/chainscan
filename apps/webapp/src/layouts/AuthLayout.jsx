import Auth0ProviderWithNavigate from "../routes/auth0-provider-with-navigate";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../components/PageLoader";

const AuthLayout = () => {
  return (
    <Auth0ProviderWithNavigate>
      <Outlet />
    </Auth0ProviderWithNavigate>
  );
};

export default AuthLayout;
