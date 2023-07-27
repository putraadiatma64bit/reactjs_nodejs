import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-sky-500 text-white">
      <div className="container mx-auto">
        <div className="flex-1">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Beranda</a>
            </li>
            <li>
              <details>
                <summary>Artikel</summary>
                <ul className="p-2 bg-base-100 text-black">
                  <li>
                    <a>Teknologi</a>
                  </li>
                  <li>
                    <a>Olahraga</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Profile</summary>
                <ul className="p-2 bg-base-100 text-black">
                  <li>
                    <a>Tentang Kami</a>
                  </li>
                  <li>
                    <a>Visi misi</a>
                  </li>
                  <li>
                    <a>Sejarah</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <Link to="/login">
            <button className="btn btn-info">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
