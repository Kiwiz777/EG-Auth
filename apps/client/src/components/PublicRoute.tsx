// components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
