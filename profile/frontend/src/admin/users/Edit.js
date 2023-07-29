import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Navbar from "../widget/Navbar";
import Sidebar from "../widget/Sidebar";
import "../widget/Widget.css";
import Breadcrumb from "../widget/Breadcrumb";

const Edit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/users/edit/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setUsername(jsonData.username);
        //setPassword(jsonData.password);
        setRole(jsonData.role);
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
  const formik = useFormik({
    initialValues: {
      username: username,
      password: "",
      repassword: "",
      role: role,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("cat is required"),
      password: Yup.string().required("title is required"),
      repassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Please confirm your password"),
      role: Yup.string().required("content is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/users/update/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
              role: values.role,
            }),
          }
        );

        if (response.ok) {
          // Redirect ke halaman List setelah berhasil menyimpan perubahan
          navigate("/users_list");
        } else {
          console.error("Gagal menyimpan perubahan");
        }
      } catch (error) {
        console.error("Error saat menyimpan perubahan:", error);
      }
    },
  });
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={"drawer " + (isSidebarOpen ? "lg:drawer-open" : "")}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*----------------------------------------------*/}
          <Breadcrumb
            pathLocation={[
              { myroute: "users_list", name: "Users" },
              { myroute: "users_edit/" + id, name: "Edit" },
            ]}
          />
          <div className="p-4 border shadow-md mt-4 mb-4 mr-4 ml-4 w-1/2">
            <h2 className="text-2xl font-bold">Edit Record</h2>
            <form onSubmit={formik.handleSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  {...formik.getFieldProps("username")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 mt-1">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  rePassword:
                </label>
                <input
                  type="password"
                  id="repassword"
                  {...formik.getFieldProps("repassword")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.repassword && formik.errors.repassword ? (
                  <div className="text-red-500 mt-1">
                    {formik.errors.repassword}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  {...formik.getFieldProps("role")}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {formik.touched.role && formik.errors.role ? (
                  <div className="text-red-500 mt-1">{formik.errors.role}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              >
                Simpan Perubahan
              </button>
              <Link to="/users_list" className="ml-2">
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
