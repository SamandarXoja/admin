import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Contract from "./pages/contract";
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
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
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
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response, // Pass successful responses
      (error) => {
        if (error.response && error.response.status === 401) {
          handleLogout(); // Logout on 401 error
        }
        return Promise.reject(error); // Forward other errors
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor); // Clean up interceptor
    };
  }, []);

  useEffect(() => {
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
    navigate("/login");
  };

  return (
    <>
      <div className="flex">
        {isAuthenticated && <Sidebar onLogout={() => setIsAlertOpen(true)} />}
        <div className="flex-1 ">
          <Routes>
            {!isAuthenticated && (
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            )}

            {/* Вложенные маршруты для Home */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomeLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path=":id" element={<Page data={categoriesData} />} />
              <Route
                path=":id/:secondId"
                element={<Second data={categoriesData} />}
              />
              <Route
                path=":id/:secondId/:threeId"
                element={<Three data={categoriesData} />}
              />
            </Route>

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
              path="/contract"
              element={
                isAuthenticated ? (
                  <Contract />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
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

function HomeLayout() {
  return (
    <div className="">
      <Home />
      {/* Вложенные маршруты будут рендериться здесь */}
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
