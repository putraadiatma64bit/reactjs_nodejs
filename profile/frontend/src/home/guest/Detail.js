import React, { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
import Cat from "../widget/Cat";
import Breadcrumb from "../widget/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";

const Detail = () => {
  const [cats, setCats] = useState([]);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/home/guest/detail",
        {}
      );
      const jsonData = await response.json();
      setCats(jsonData.cat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/home/guest/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, title, content }),
      });
      //console.log(response);
      if (response.ok) {
        // Redirect ke halaman List setelah berhasil menyimpan perubahan
        navigate("/");
      } else {
        console.error("Gagal menyimpan perubahan");
      }
    } catch (error) {
      console.error("Error saat menyimpan perubahan:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12 p-4">
            <Breadcrumb
              pathLocation={[{ myroute: "detail", name: "Detail" }]}
            />
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              {/*----------------------------------------------*/}
              <div className="p-4 border shadow-md mt-4 mb-4 mr-4 ml-4 w-1/2">
                <h2 className="text-2xl font-bold">Contact Blog</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
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
                    <label htmlFor="tile" className="block text-sm font-medium">
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
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium"
                    >
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
                    Kirim
                  </button>
                  <Link to="/users_list" className="ml-2">
                    Kembali
                  </Link>
                </form>
              </div>
              {/*----------------------------------------------*/}
            </div>
          </div>
          <div className="w-full md:w-4/12 p-4">{<Cat dataCat={cats} />}</div>
        </div>
      </div>
    </>
  );
};

export default Detail;
