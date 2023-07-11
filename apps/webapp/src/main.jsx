import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Alerts from "./routes/Alerts";
import CreateAlert from "./routes/CreateAlert";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "/alerts",
        element: <Alerts />,
      },
      {
        path: "/create-alert",
        element: <CreateAlert />
      }
    ],
  },
  {
    path: "/contacts/:contactId",
    element: <Contact />,
  },
  { path: "/alerts", element: <Alerts /> },
  {path:"/create-alert",
element: <CreateAlert />}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
