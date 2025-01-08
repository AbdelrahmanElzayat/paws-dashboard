import { useEffect } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
      <div className="not-found">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to="/">Go back to the homepage</Link>
      </div>
  );
};

export default Portfolio;
