import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const Add = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [progress, setProgress] = useState(0);
  //const [content, setContent] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      //cat: "",
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      //cat: Yup.string().required("cat is required"),
      title: Yup.string().required("title is required"),
      content: Yup.string().required("content is required"),
    }),
    onSubmit: (values) => {
      // Lakukan sesuatu dengan data yang di-submit (misalnya, mengirim ke server)
      const token = localStorage.getItem("token");
      const users = localStorage.getItem("users");

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("photo", photo);
      formData.append("content", values.content);
      formData.append("users", users);

      axios
        .post("http://localhost:5000/page/save", formData, {
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
          if (response.status === 201) {
            navigate("/page_list");
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
    },
  });
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
              { myroute: "page_list", name: "Page" },
              { myroute: "page_add", name: "Add" },
            ]}
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold">Tambah Record Baru</h2>
            <form onSubmit={formik.handleSubmit} className="mt-4">
              {/*<div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  id="cat"
                  {...formik.getFieldProps("cat")}
                  className="select select-bordered"
                >
                  <option value={null}>-- Pilih --</option>
                  <option value={1}>satu</option>
                  <option value={2}>dua</option>
                </select>
                {formik.touched.cat && formik.errors.cat ? (
                  <div className="text-red-500 mt-1">{formik.errors.cat}</div>
                ) : null}
                </div>*/}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  {...formik.getFieldProps("title")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-500 mt-1">{formik.errors.title}</div>
                ) : null}
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
                  {...formik.getFieldProps("content")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.content && formik.errors.content ? (
                  <div className="text-red-500 mt-1">
                    {formik.errors.content}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              >
                Simpan
              </button>
              <Link to="/page_list" className="ml-2">
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
