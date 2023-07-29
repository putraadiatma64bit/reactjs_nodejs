import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const Add = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [listCat, setListCat] = useState([]);
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post/add", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setListCat(jsonData.allCat);
      } else {
        console.error("Gagal mengambil data");
      }
    } catch (error) {
      console.error("Error saat mengambil data:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const users = localStorage.getItem("users");

    const formData = new FormData();
    formData.append("cat", cat);
    formData.append("title", title);
    if (photo != null) formData.append("photo", photo);
    formData.append("content", content);
    formData.append("users", users);

    axios
      .post("http://localhost:5000/post/save", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          navigate("/post_list");
        } else {
          console.error("Gagal menyimpan data");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error saat menyimpan data:", error.response.data);
        } else {
          console.error("Error saat menyimpan data:", error.message);
        }
      });
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
              { myroute: "post_list", name: "Post" },
              { myroute: "post_add", name: "Add" },
            ]}
          />
          <div className="p-4 border shadow-md mt-4 mb-4 mr-4 ml-4 w-1/2">
            <h2 className="text-2xl font-bold">Tambah Record Baru</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  id="cat"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="select select-bordered"
                >
                  <option value={null}>-- Pilih --</option>
                  {listCat.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
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
                  Photo:
                </label>
                <input
                  type="file"
                  id="photo"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setPhoto(selectedFile);
                    }
                  }}
                  className="file-input file-input-bordered w-full max-w-xs"
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
              <Link to="/post_list" className="ml-2">
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
