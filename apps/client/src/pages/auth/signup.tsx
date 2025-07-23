import * as React from "react";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Alert from "@mui/material/Alert";
import { signup } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [repeatPasswordError, setRepeatPasswordError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validateEmail = (email: string) =>
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);

  const validatePassword = (pass: string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);

  const validateName = (name: string) => name.trim().length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRepeatPasswordError("");

    if (!validateName(name)) {
      setNameError("Name must be at least 3 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      return setError(
        "Password must be at least 8 characters long and include a letter, a number, and a special character."
      );
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    if (emailError || passwordError || nameError || repeatPasswordError) return;
    setLoading(true);
    try {
      const res = await signup(name, email, password);
      setSuccess(res);
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return;
      //await login(email, password);
      //const me = await api.post("/auth/me");
      //setUser(me.data);
      //navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed.");
      }
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
          <Alert
            severity="error"
            variant="standard"
            className="mb-4"
            icon={false}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            variant="standard"
            className="mb-4"
            icon={false}
          >
            {success}
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              error={nameError ? true : false}
              helperText={nameError ? nameError : ""}
              name="name"
              value={name}
              onChange={(e) => {
                const val = e.target.value;
                setName(val);
                setNameError(
                  validateName(val) ? "" : "Name must be at least 3 characters."
                );
              }}
              placeholder="John Doe"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              error={emailError ? true : false}
              helperText={emailError ? emailError : ""}
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                setEmailError(
                  validateEmail(val) ? "" : "Invalid email format."
                );
              }}
              placeholder="youremail@example.com"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              error={passwordError ? true : false}
              helperText={passwordError ? passwordError : ""}
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setPasswordError(
                  validatePassword(val)
                    ? ""
                    : "Must include a letter, number, and special character."
                );
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Password"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <TextField
              error={repeatPasswordError ? true : false}
              helperText={repeatPasswordError ? repeatPasswordError : ""}
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => {
                const val = e.target.value;
                setRepeatPassword(val);
                setRepeatPasswordError(
                  val === password ? "" : "Passwords do not match."
                );
              }}
              placeholder="repeatPassword"
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
