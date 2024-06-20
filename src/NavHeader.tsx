import { NavLink } from "react-router-dom";

export default function NavHeader() {
  return (
    <nav>
      <ul>
        <div>
          <NavLink to="/">Deltagere</NavLink>
        </div>
      </ul>
    </nav>
  );
}
