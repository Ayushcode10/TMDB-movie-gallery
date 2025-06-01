import "./css/App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { useEffect, useState } from "react";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setIsLoggedIn(!!loggedInUser);

  }, [location]);

  const hideNavBar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <MovieProvider>
      {!hideNavBar && <NavBar setIsLoggedIn={setIsLoggedIn} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={isLoggedIn ? <Favorites /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn}><Home /></PrivateRoute>} />
          <Route path="/movie/:id" element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </MovieProvider>

  );
}

export default App;
