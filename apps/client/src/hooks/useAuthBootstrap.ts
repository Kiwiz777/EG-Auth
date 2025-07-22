import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import api from "../api/axios"; // Axios with `withCredentials: true`

export function useAuthBootstrap() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  //   const logout = useAuthStore((s) => s.logout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we already have the user in store, skip re-fetching
    if (user) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    api
      .post("/auth/me")
      .then((res) => {
        if (!cancelled) setUser(res.data);
      })
      .catch((err) => {
        if (!cancelled && err.response?.status === 401) {
          // Do nothing. User isn't logged in. Don't call logout if no session existed.
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, setUser]);

  return { loading };
}
