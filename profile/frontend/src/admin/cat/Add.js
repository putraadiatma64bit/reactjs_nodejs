import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const Add = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const users = localStorage.getItem("users");
      const response = await fetch("http://localhost:5000/cat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name, users }),
      });

      if (response.ok) {
        // Redirect ke halaman List setelah berhasil menyimpan
        navigate("/cat_list");
      } else {
        console.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
    }
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={"drawer " + (isSidebarOpen ? "lg:drawer-open" : "")}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*----------------------------------------------*/}
          <Breadcrumb
            pathLocation={[
              { myroute: "cat_list", name: "Cat" },
              { myroute: "cat_add", name: "Add" },
            ]}
          />
          <div className="p-4 border shadow-md mt-4 mb-4 mr-4 ml-4 w-1/2">
            <h2 className="text-2xl font-bold">Tambah Record Baru</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Category:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              >
                Simpan
              </button>
              <Link to="/cat_list" className="ml-2">
                Kembali
              </Link>
            </form>
          </div>
          {/*----------------------------------------------*/}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Add;
