import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import React from "react";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // Имитация авторизации
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Akkountingizga kirish</h1>
      <div className="w-[300px]">
        <Select>
          <p className="mb-2">Foydalanuvchi</p>
          <SelectTrigger className="max-w-[300px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-[300px]">
        <Select>
          <p className="mt-5 mb-2">Bo'lim:</p>
          <SelectTrigger className="max-w-[300px] ">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
