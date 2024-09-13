import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/AuthContext";

export const Navbar = () => {
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    setToken(localStorage.removeItem("tkn"));
    navigate("/login");
  };
  return (
    <>
      <div className="navbar bg-slate-200 shadow-sm px-6">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">Notes</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {token ? (
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
          {token && (
            <span onClick={handleSignOut} className="ms-1 cursor-pointer">
              SignOut
            </span>
          )}
        </div>
      </div>
    </>
  );
};
