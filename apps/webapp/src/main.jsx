import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./App-test";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./routes/auth0-provider-with-navigate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
