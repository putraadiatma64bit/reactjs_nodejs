import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";

const List = () => {
  const [items, setItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post", {
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
  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post/delete/" + id, {
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
  const FloatButtonAdd = () => {
    return (
      <div className="fixed bottom-4 right-4">
        <Link to={"/post_add/"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            <FaPlus />
          </button>
        </Link>
      </div>
    );
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={"drawer " + (isSidebarOpen ? "drawer-open" : "")}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*----------------------------------------------*/}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Cat</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{item.id}</th>
                      <th>{item.catname}</th>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>
                        <div>
                          <Link to={"/post_edit/" + item.id}>
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
