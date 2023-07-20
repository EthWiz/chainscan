import { Link } from "react-router-dom";

export const HomeNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          <img
            className="logo"
            style={{ width: "50px", height: "50px" }}
            src="https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-750x750.webp"
            alt="logo"
          />
          Chainscan
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="gap-5 collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <Link className="nav-link active" to="/">
            Home
          </Link>
          <Link className="btn btn-primary" to="/app">
            App
          </Link>
        </div>
      </div>
    </nav>
  );
};
