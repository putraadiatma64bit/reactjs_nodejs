import React, { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
import Cat from "../widget/Cat";
import Breadcrumb from "../widget/Breadcrumb";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [items, setItems] = useState({});
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/home/page/detail/" + id,
        {}
      );
      const jsonData = await response.json();
      setItems(jsonData.page);
      setCats(jsonData.cat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12 p-4">
            <Breadcrumb pathLocation={[{ myroute: "guest", name: "Guest" }]} />
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={`http://localhost:5000/uploads/${items["photo"]}`}
                  alt="Shoes"
                  className="w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{items["title"]}</h2>
                <p>{items["content"]}</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12 p-4">{<Cat dataCat={cats} />}</div>
        </div>
      </div>
    </>
  );
};

export default Detail;
