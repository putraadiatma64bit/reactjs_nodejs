import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const List = () => {
  const [items, setItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/cat?key=" + search, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const clearSearch = () => {
    setSearch("");
    fetchData();
  };
  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/cat/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const updatedItems = items.filter((item) => {
        if (item.id !== id) return true;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const FloatButtonAdd = () => {
    return (
      <div className="fixed bottom-4 right-4">
        <Link to={"/cat_add/"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            <FaPlus />
          </button>
        </Link>
      </div>
    );
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
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={"drawer " + (isSidebarOpen ? "lg:drawer-open" : "")}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*----------------------------------------------*/}
          <Breadcrumb pathLocation={[{ myroute: "cat_list", name: "Cat" }]} />
          <div className="bg-yellow flex-row">
            <div className="float-right mr-2 mt-2 mb-2 join">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-sm input-bordered w-full join-item"
              />
              <button
                className="join-item btn btn-sm btn-info text-white"
                onClick={fetchData}
              >
                <FaSearch />
              </button>
              <button
                className="join-item btn btn-sm btn-success text-white"
                onClick={clearSearch}
              >
                <FaUndo />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-sky-500 text-base text-white">
                  <th>No.</th>
                  <th>Name</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        <div>
                          <Link to={"/cat_edit/" + item.id}>
                            <button className="daisy-btn daisy-btn-primary mr-2">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            className="daisy-btn daisy-btn-danger"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="divider"></div>
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
            <FloatButtonAdd />
          </div>
          {/*----------------------------------------------*/}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default List;
