import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderLayout({ children }) {
  const navigate = useNavigate();

  function handleLogout() {
    const logOut = window.confirm(
      "Bratim rostdan ham tizimdan chiqmoqchimisiz?"
    );
    if (logOut) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <header className="bg-slate-200 shadow-md fixed top-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Books Applicatoin
          </h1>

          <Link className="text-2xl font-semibold text-gray-800" to={'/'} >Home</Link>
          
                            <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Chiqish!
          </button>
        
        </div>
      </header>

      <main className="flex-grow pt-20 p-4">{children}</main>
    </div>
  );
}

export default HeaderLayout;
