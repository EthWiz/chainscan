const Topbar = () => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        Duomly Dashboard
      </a>
      <input
        type="text"
        className="form-control form-control-primary w-100"
        placeholder="Search..."
      />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Topbar;
