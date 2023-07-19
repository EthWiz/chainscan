import "./home-page.css";

const HomePage = () => {
  return (
    <div className="container hero">
      <div className="row">
        <div className="col-6">
          <h1 className="display-3">Welcome to Chainscan!</h1>
          <h2 className="lead text-muted">Open source project</h2>
          <p>this was added using github actions</p>
        </div>
        <div className="col-6">
          <img
            className="hero-img"
            src="https://i.stack.imgur.com/b7TDL.jpg"
            alt="radar"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
