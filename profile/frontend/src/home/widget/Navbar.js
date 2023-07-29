import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [page, setPage] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/cat/list", {});
      const jsonData = await response.json();
      setPage(jsonData.page);
      setCats(jsonData.cat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      // Potong teks hingga 100 kata dengan memecahnya menjadi array kata-kata
      const words = text.split(" ");
      const truncatedText = words.slice(0, maxLength).join(" ");
      return truncatedText + "...";
    }
  };
  return (
    <div className="navbar bg-sky-500 text-white">
      <div className="container mx-auto">
        <div className="flex-1">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Beranda</a>
            </li>
            <li>
              <details>
                <summary>Artikel</summary>
                <ul className="p-2 bg-base-100 text-black">
                  {cats.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <li>
                          <a
                            href={`/cat/${item.id}`}
                            className="link link-primary"
                          >
                            {item.name}
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  })}
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
                  {page.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <li>
                          <a
                            href={`/page/${item.id}`}
                            className="link link-primary"
                          >
                            {truncateText(item.title, 10)}
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </details>
            </li>
            <li>
              <a href="/guest">Kontak</a>
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
