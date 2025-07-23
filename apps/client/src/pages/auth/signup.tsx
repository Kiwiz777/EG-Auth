import * as React from "react";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Alert from "@mui/material/Alert";
import { signup, login } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const validatePassword = (pass: string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      return setError("Passwords do not match.");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password must be at least 8 characters long and include a letter, a number, and a special character."
      );
    }

    setLoading(true);
    try {
      await signup(name, email, password); 
      await login(email, password);
      const me = await api.post("/auth/me");
      setUser(me.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed.");
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
            Create an Account
          </Typography>
        </div>

        {error && (
          <Alert color="danger" variant="soft" className="mb-4">
            {error}
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
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
              placeholder="Password"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <Input
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormControl>

          <div className="flex justify-center">
            <Button type="submit" loading={loading}>
              Sign up
            </Button>
          </div>
        </form>

        <Typography
          level="body-sm"
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
          endDecorator={<Link href="/login">Log in</Link>}
        >
          Already have an account?
        </Typography>
      </Card>
    </div>
  );
}
