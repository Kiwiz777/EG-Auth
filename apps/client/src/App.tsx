import { useAuthBootstrap } from "./hooks/useAuthBootstrap";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/Home";

function App() {
  const { loading } = useAuthBootstrap();

  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
