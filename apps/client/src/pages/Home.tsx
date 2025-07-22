// src/pages/Home.tsx
import { useAuthStore } from "../store/auth";
import { Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // Or a fallback, or redirect guard

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <Typography
          level="h2"
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Welcome, {user.name} 👋
        </Typography>
        <Typography
          level="body-md"
          className="text-gray-600 dark:text-gray-300 mb-6"
        >
          You're logged in and can now explore the app.
        </Typography>
        <Button
          variant="solid"
          color="danger"
          className="rounded-xl px-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
