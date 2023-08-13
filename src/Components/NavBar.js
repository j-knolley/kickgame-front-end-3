import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <NavLink to="/kicks">Kickgame</NavLink>
      </h1>
    </nav>
  );
}
