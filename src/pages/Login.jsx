
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Validatsiya
    if (!emailRef.current.value) {
      alert("Emailizngizni kiriting!");
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
      return;
    }
    emailRef.current.style.border = ""; 

    if (!passwordRef.current.value) {
      alert("Parolni kiriting!");
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red"; 
      return;
    }
    passwordRef.current.style.border = ""; 

    const userForm = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);

    api
      .post("/login", userForm)
      .then((response) => {
        const data = response.data;

        if (data.message === "User Not found") {
          alert("Username yoki parol noto'g'ri");
        }

        if (data.user) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Parol yoki Email noto'g'ri ");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-slate-300">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-96 flex flex-col bg-white border border-solid border-blue-600 rounded-lg shadow-lg p-6 gap-4 z-10"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Kirish</h2>

        <input
          className="w-full p-2 bg-white border border-solid border-blue-400 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          ref={emailRef}
          type="text"
          placeholder="Emailingizni kiriting..."
        />
        <input
          className="w-full p-2 bg-white border border-solid border-blue-400 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          ref={passwordRef}
          type="password"
          placeholder="Parolimgizni kiriting..."
        />
        <button
          disabled={loading}
          className="bg-blue-700 py-2 rounded-md text-white text-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link to="/register" className="text-blue-500 text-center mt-2">
          Ro'yxatdan o'tish
        </Link>
      </form>
    </div>
  );
}

export default Login;
