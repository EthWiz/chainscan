import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Alerts from "./routes/Alerts";
import CreateAlert from "./routes/CreateAlert";
import { CallbackPage } from "./routes/callback-page";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/alerts",
        element: <Alerts />,
      },
      {
        path: "/create-alert",
        element: <CreateAlert />,
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
    ],
  },
  { path: "/alerts", element: <Alerts /> },
  { path: "/create-alert", element: <CreateAlert /> },
  { path: "/callback", element: <CallbackPage /> },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
