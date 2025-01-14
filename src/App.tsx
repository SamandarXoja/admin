import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Main from "./pages/main";
import UserAdd from "./pages/user-add";
import Sidebar from "./sidebar";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    // Удаляем токен и обновляем состояние
    localStorage.removeItem("authToken");
    setIsAuthenticated(false); // Сразу обновляем состояние, чтобы Sidebar исчез
    Navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <>
      <div className="flex">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="flex-1">
          <Routes>
            {!isAuthenticated && (
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            )}

            <Route
              path="/"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/main"
              element={
                isAuthenticated ? <Main /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/user-add"
              element={
                isAuthenticated ? <UserAdd /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
