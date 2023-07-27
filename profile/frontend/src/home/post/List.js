import React, { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
import Cat from "../widget/Cat";
import Breadcrumb from "../widget/Breadcrumb";
import { Link } from "react-router-dom";

const List = () => {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/post/list", {});
      const jsonData = await response.json();
      setItems(jsonData.post);
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
            <Breadcrumb pathLocation={[]} />
            {items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                        alt="Album"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.title}</h2>
                      <p>{item.content}</p>
                      <div className="card-actions justify-end">
                        <Link to={`/detail/${item.id}`}>
                          <button className="btn btn-link">
                            Lebih Lengkap
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                </React.Fragment>
              );
            })}
            ;
          </div>
          <div className="w-full md:w-4/12 p-4">
            <Cat dataCat={cats} />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
