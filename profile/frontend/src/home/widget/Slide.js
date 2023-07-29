import React from "react";
import "./Caraousel.css";

const Slide = ({ dataSlide }) => {
  return (
    <>
      <div className="carousel w-full">
        {dataSlide.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div id={item.id} className="carousel-item w-full">
                <img
                  src={`http://localhost:5000/uploads/${item.photo}`}
                  className="w-full carousel-image"
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {dataSlide.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <a href={"#" + item.id} className="btn btn-xs">
                {index + 1}
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Slide;
