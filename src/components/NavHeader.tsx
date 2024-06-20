import { NavLink } from "react-router-dom";
import "../styling/navbar.css"

export default function NavHeader() {
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <NavLink to="/">Participants</NavLink>
          <NavLink to="/results">Results</NavLink>
        </div>
      </ul>
    </nav>
  );
}