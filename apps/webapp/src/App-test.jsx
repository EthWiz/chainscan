import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import ErrorPage from "./error-page";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./routes/Homepage";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/page-loader";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { AuthenticationGuard } from "./components/authentication-guard";
import CreateAlert from "./routes/CreateAlert";
import TestingPage from "./routes/TestingPage";
import WebsiteLayout from "./components/website/WebsiteLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <AuthenticationGuard component={CreateAlert} /> },
      {
        path: "testing",
        element: <AuthenticationGuard component={TestingPage} />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
