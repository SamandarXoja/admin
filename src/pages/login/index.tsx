import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://147.45.107.174:5000/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // spravochnik , prixod rasxod

      //matrerila turlarshtatka  bolimlar   material qo'shish
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        await getUserData();

        onLogin();
        navigate("/");
      }
    } catch (err) {
      setError("Неверный логин или пароль");
      console.error(err);
    }
  };

  const getUserData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get(
          "http://147.45.107.174:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User data", response.data);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Akkountingizga kirish</h1>
      <div className="w-[300px] mb-4">
        <Input
          placeholder="Foydalanuvchi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="w-[300px]">
        <Input
          placeholder="parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button
        className="w-[300px] px-4 py-2 bg-blue-500 text-white rounded mt-3"
        onClick={handleLogin}
      >
        Kirish
      </Button>
    </div>
  );
};

export default Login;
