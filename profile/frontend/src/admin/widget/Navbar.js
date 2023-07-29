import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    navigate("/login");
  };
  return (
    <div className="navbar bg-warning text-warning-content">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Company Profile</a>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/profile_edit"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
