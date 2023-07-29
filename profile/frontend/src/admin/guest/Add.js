import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const Add = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      //const users = localStorage.getItem("users");
      const response = await fetch("http://localhost:5000/guest/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ email, title, content }),
      });

      if (response.ok) {
        // Redirect ke halaman List setelah berhasil menyimpan
        navigate("/guest_list");
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
              { myroute: "guest_list", name: "Guest" },
              { myroute: "guest_add", name: "Add" },
            ]}
          />
          <div className="p-4 border shadow-md mt-4 mb-4 mr-4 ml-4 w-1/2">
            <h2 className="text-2xl font-bold">Tambah Record Baru</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium">
                  Content:
                </label>
                <textarea
                  type="text"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              >
                Simpan
              </button>
              <Link to="/guest_list" className="ml-2">
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
