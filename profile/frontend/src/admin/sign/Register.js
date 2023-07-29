import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Redirect ke halaman beranda setelah login berhasil
        navigate("/login");
      } else {
        console.log(response);
        // Tangani kasus ketika login gagal
        setErrorMessage("Username atau password salah");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-96 border rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Halaman Daftar</h1>
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaUser className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="pl-10 input input-bordered focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaLock className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="pl-10 input input-bordered focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
          onClick={handleRegister}
        >
          Daftar
        </button>
        <Link to={"/login"}>
          <button className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg w-full">
            Halaman Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
