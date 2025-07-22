import * as React from "react";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import { login } from "@/api/auth";
import Alert from "@mui/material/Alert";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      console.log("Login successful:", data);
      const me = await api.post("/auth/me"); // Get user info
      setUser(me.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card
        variant="outlined"
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
      >
        <div className="mb-6 text-center">
          <Typography
            level="h4"
            component="h1"
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Welcome!
          </Typography>
          <Typography
            level="body-sm"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Sign in to continue.
          </Typography>
        </div>

        {error && (
          <Alert color="danger" variant="soft" className="mb-4">
            {error}
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormControl>

          <div className="flex justify-center">
            <Button type="submit" loading={loading}>
              Log in
            </Button>
          </div>
        </form>

        <Typography
          level="body-sm"
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
          endDecorator={<Link href="/signup">Sign up</Link>}
        >
          Don’t have an account?
        </Typography>
      </Card>
    </div>
  );
}
