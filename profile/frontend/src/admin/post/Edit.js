import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";

const Edit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();

  const [cat, setCat] = useState("");
  const [catName, setCatName] = useState("");
  const [listCat, setListCat] = useState([]);

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
      //console.log(id);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post/edit/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();

        setCat(jsonData.rowPost.cat);
        setCatName(jsonData.rowPost.name_cat);
        setListCat(jsonData.cat);
        setTitle(jsonData.rowPost.title);
        setContent(jsonData.rowPost.content);
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
    const formData = new FormData();
    formData.append("cat", cat);
    formData.append("title", title);
    formData.append("photo", photo);
    formData.append("content", content);

    axios
      .post("http://localhost:5000/post/update/" + id, formData, {
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
        if (response.status === 200) {
          navigate("/post_list");
        } else {
          console.error("Gagal menyimpan data" + response);
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
          <div className="p-4">
            <h2 className="text-2xl font-bold">Edit Record</h2>
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
                  <option>{catName}</option>
                  {listCat.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
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
                <input
                  type="text"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              >
                Simpan Perubahan
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

export default Edit;
