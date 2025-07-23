import axios from "axios";
import { useAuthStore } from "@/store/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { user, logout } = useAuthStore.getState();

    const is401 = err.response?.status === 401;
    const isLogoutEndpoint = err.config?.url?.includes("/logout");

    if (is401 && !isLogoutEndpoint) {
      const hasAuthCookie = document.cookie.includes(
        import.meta.env.COOKIE_NAME || "access_token"
      ); // ← customize this
      console.log(hasAuthCookie);

      if (user && hasAuthCookie) {
        // Only logout if we were logged in and still have a session cookie
        await logout();
      }
    }

    return Promise.reject(err);
  }
);

export default api;
