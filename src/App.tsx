import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Main from "./pages/main";
import Page from "./pages/main-category/page";
import Second from "./pages/main-category/second";
import Three from "./pages/main-category/second/three";
import UserAdd from "./pages/user-add";
import Sidebar from "./sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    async function fetchCategories() {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          return;
        }

        const response = await axios.get(
          "http://147.45.107.174:5000/api/material-category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategoriesData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    setIsAlertOpen(false);
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    Navigate("/login");
  };

  return (
    <>
      <div className="flex">
        {isAuthenticated && <Sidebar onLogout={() => setIsAlertOpen(true)} />}
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
            <Route
              path="/:id"
              element={
                isAuthenticated ? (
                  <Page data={categoriesData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/:id/:secondId"
              element={
                isAuthenticated ? (
                  <Second data={categoriesData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/:id/:secondId/:threeId"
              element={
                isAuthenticated ? (
                  <Three data={categoriesData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-cyan-600 text-white"
              onClick={handleLogout}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default App;
