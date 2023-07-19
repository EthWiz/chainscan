import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../components/PageLoader";
const WebsiteLayout = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default WebsiteLayout;
