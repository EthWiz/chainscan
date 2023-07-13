import { Outlet, Link } from "react-router-dom";
import Auth0ProviderWithNavigate from "../../routes/auth0-provider-with-navigate";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../page-loader";
const DashboardLayout = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (error) {
    console.log(error);
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Auth0ProviderWithNavigate>
        <Outlet />
      </Auth0ProviderWithNavigate>
    </>
  );
};

export default DashboardLayout;
