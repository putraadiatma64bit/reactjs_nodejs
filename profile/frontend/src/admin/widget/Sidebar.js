import React from "react";
import { FaUser, FaFolderOpen, FaThumbtack, FaClone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-60 h-full bg-base-200">
        {/* Sidebar content here */}
        <li>
          <Link to="/users_list">
            <FaUser />
            Users
          </Link>
        </li>
        <div className="divider"></div>
        <li>
          <Link to="/cat_list">
            <FaFolderOpen />
            Category
          </Link>
        </li>
        <li>
          <Link to="/post_list">
            <FaThumbtack />
            Post
          </Link>
        </li>
        <li>
          <Link to="/page_list">
            <FaClone />
            Page
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
