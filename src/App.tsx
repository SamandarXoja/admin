import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Revenue from "./pages/revenue";
import Sidebar from "./sidebar";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1">
          <Routes>
            {!isAuthenticated && <Route path="/login" element={<Login />} />}

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
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
