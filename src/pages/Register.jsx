import React, { useRef } from "react";
import api from "../../axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const navigate = useNavigate();

  const click_btn = async (event) => {
    event.preventDefault();

    const user = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repasswordRef.current.value,
    };

    // Validatsiya
    if (!user.firstName) {
      alert("Ism maydoni to'ldirilmagan.");
      fnameRef.current.focus();
      fnameRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    fnameRef.current.style.border = ""; // Chegarani tiklash

    if (!user.lastName) {
      alert("Familiya maydoni to'ldirilmagan.");
      lnameRef.current.focus();
      lnameRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    lnameRef.current.style.border = ""; // Chegarani tiklash

    if (!user.age) {
      alert("Yosh maydoni to'ldirilmagan.");
      ageRef.current.focus();
      ageRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    ageRef.current.style.border = ""; // Chegarani tiklash

    if (!user.email) {
      alert("Email maydoni to'ldirilmagan.");
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    emailRef.current.style.border = ""; // Chegarani tiklash

    if (!user.password) {
      alert("Parol maydoni to'ldirilmagan.");
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    passwordRef.current.style.border = ""; // Chegarani tiklash

    if (!user.confirmPassword) {
      alert("Parolni tasdiqlash maydoni to'ldirilmagan.");
      repasswordRef.current.focus();
      repasswordRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    repasswordRef.current.style.border = ""; // Chegarani tiklash

    if (user.password.length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    passwordRef.current.style.border = ""; // Chegarani tiklash

    if (!/[a-zA-Z]/.test(user.password)) {
      alert("Parolda hech bo'lmasa bitta harf bo'lishi kerak.");
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    passwordRef.current.style.border = ""; // Chegarani tiklash

    if (user.password !== user.confirmPassword) {
      alert("Parol va tasdiqlangan parol mos kelmaydi.");
      repasswordRef.current.focus();
      repasswordRef.current.style.border = "1px solid red"; // Qizil chegara
      return;
    }
    repasswordRef.current.style.border = ""; // Chegarani tiklash

    // Foydalanuvchini ro'yxatdan o'tkazish
    api
      .post("/register", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        if (
          data.data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi"
        ) {
          navigate("/login");
        } else {
          alert(data.data.message);
        }
      })
      .catch((err) => {
        alert("Bu email allaqachon ro'yxatdan otgan");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-slate-300 relative">
      <div className="absolute inset-0 backdrop-blur-md opacity-30"></div>
      <form
        onSubmit={click_btn}
        className="w-96 flex flex-col bg-white border border-solid border-blue-600 rounded-md shadow-md p-6 gap-4 z-10"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Ro'yxatdan o'tish
        </h2>

        <input
          ref={fnameRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="text"
          placeholder="Ismingizni kiriting..."
        />
        <input
          ref={lnameRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="text"
          placeholder="Familiyangizni kiriting..."
        />
        <input
          ref={ageRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="number"
          placeholder="Yoshingizni kiriting..."
        />
        <input
          ref={emailRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="text"
          placeholder="Emailingizni kiriting..."
        />
        <input
          ref={passwordRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="password"
          placeholder="Parolni yarating..."
        />
        <input
          ref={repasswordRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400 focus:outline-none focus:border-blue-500 transition duration-200"
          type="password"
          placeholder="Parolni tasdiqlang..."
        />
        <button
          type="submit"
          className="py-2 px-3 border-none bg-blue-700 rounded-md text-white hover:bg-blue-600 transition duration-200"
        >
          Ro'yxatdan o'tish
        </button>
        <Link to="/login" className="text-blue-500 text-center mt-2">
          Kirish
        </Link>
      </form>
    </div>
  );
}

export default Register;
