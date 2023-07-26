import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-md-3 bg-light d-none d-md-block sidebar">
      <ul className="nav flex-column sidebar-nav">
        <li className="nav-item">
          <Link
            to="create-alert"
            className="btn btn-primary text-white nav-link active"
          >
            Create Alert
          </Link>
        </li>
        <li className="nav-item">
          <Link to="alerts" className=" nav-link active">
            Alerts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="destinations" className=" nav-link active">
            Destinations
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
