import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import HomePage from "./routes/Homepage";
import DashboardLayout from "./layouts/DashboardLayout";
import { AuthenticationGuard } from "./components/authentication-guard";
import CreateAlert from "./routes/CreateAlert";
import TestingPage from "./routes/TestingPage";
import WebsiteLayout from "./layouts/WebsiteLayout";
import CallbackPage from "./routes/callback-page";
import AuthLayout from "./layouts/AuthLayout";
import Alerts, { loader as alertsLoader } from "./routes/Alerts";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WebsiteLayout />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
      {
        path: "/app",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AuthenticationGuard component={CreateAlert} />,
          },
          {
            path: "alerts",
            element: <AuthenticationGuard component={Alerts} />,
            loader: { alertsLoader },
          },
          {
            path: "testing",
            element: <AuthenticationGuard component={TestingPage} />,
          },
        ],
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
