import React from "react";
import { Link } from "react-router-dom";

const Cat = ({ dataCat }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Category</h2>
        {dataCat.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <a href={`/cat/${item.id}`} className="link link-primary">
                {item.name}
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cat;
