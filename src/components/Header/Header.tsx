import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext.tsx";
import "./Header.scss";

export const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header>
        <nav
          className="navbar has-shadow navbar--position "
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-start ">
            <span className="icon">
              <i className="fas fa-user"></i>
            </span>
            <span className="">{user ? user.name : "Home"}</span>
          </div>
          <div className="navbar-end">
            <Link to="login" className="button is-light" onClick={() => logout()}>
              Logout
              <span className="icon pr-3 pl-5">
                <i className="fas fa-door-open"></i>
              </span>
            </Link>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
};
