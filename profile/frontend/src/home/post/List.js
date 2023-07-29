import React, { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
import Cat from "../widget/Cat";
import Breadcrumb from "../widget/Breadcrumb";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Slide from "../widget/Slide";

const List = () => {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [slide, setSlide] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/post/list", {});
      const jsonData = await response.json();
      setItems(jsonData.post);
      setCats(jsonData.cat);
      setSlide(jsonData.slide);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = items.slice(offset, offset + itemsPerPage);
  const mybtn =
    "border border-sky-500 rounded hover:bg-sky-500 hover:text-white";
  const mybtn_ =
    "border border-sky-500 rounded bg-sky-500 text-white hover:bg-white hover:text-sky-500";
  const mybtn_active = "border border-sky-500 rounded bg-sky-500 text-white";

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full p-4">
            <Slide dataSlide={slide} />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12 p-4">
            <Breadcrumb pathLocation={[]} />
            {paginatedData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src={`http://localhost:5000/uploads/${item.photo}`}
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

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(items.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"flex justify-center mt-4 space-x-2"}
              pageClassName={mybtn}
              previousClassName={mybtn_}
              nextClassName={mybtn_}
              activeClassName={mybtn_active}
              previousLinkClassName={"p-3"}
              nextLinkClassName={"p-3"}
              pageLinkClassName={"p-3"}
            />
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
