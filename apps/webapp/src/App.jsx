import { Routes, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import Alerts from "./routes/Alerts";
import CreateAlert from "./routes/CreateAlert";
import { CallbackPage } from "./routes/CallbackPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./routes/Homepage";
import { AuthenticationGuard } from "./components/authentication-guard";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/page-loader";
import Root from "./routes/root";
import TestingPage from "./routes/TestingPage";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AuthenticationGuard component={Root} />}>
        <Route path="testing" element={<TestingPage />} />
        <Route path="alerts" element={<Alerts />} />
        <Route
          path="create-alert"
          element={<AuthenticationGuard component={CreateAlert} />}
        />
        <Route path="callback" element={<CallbackPage />} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: '/', element: <HomePage /> },
//       { path: '/products', element: <ProductsPage /> },
//     ],
//   }
// ]);

// // const router = createBrowserRouter(routeDefinitions);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
