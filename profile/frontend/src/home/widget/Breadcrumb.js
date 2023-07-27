import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pathLocation }) => {
  let routeTo = "/";
  return (
    <nav className="text-sm font-medium mb-4">
      <ol className="list-none p-0 flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathLocation.map((path, index) => {
          const localRouteTo = routeTo.concat(path.myroute + "/");
          //console.log(localRouteTo);
          const isLast = index === pathLocation.length - 1;
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    to={localRouteTo}
                    className="text-blue-500 hover:underline"
                  >
                    {path.name}
                  </Link>
                </>
              ) : (
                <span className="mx-2">/ {path.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
