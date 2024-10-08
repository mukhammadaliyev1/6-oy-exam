import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HeaderLayout from "./Layout/HeaderLayout";
import BookDetalies from "./pages/BookDetalies"
function App() {
  const [tok, setTok] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTok(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("/register")) {
        navigate("/login");
      }
    }
  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HeaderLayout>
              <Home />
            </HeaderLayout>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/books/:id"
          element={
            <HeaderLayout>
              <BookDetalies />
            </HeaderLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
