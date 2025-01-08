import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Revenue from "./pages/revenue";
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

  return (
    <>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
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
              path="/revenue"
              element={
                isAuthenticated ? <Revenue /> : <Navigate to="/login" replace />
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
