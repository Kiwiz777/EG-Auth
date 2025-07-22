import api from "./axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/signin", { email, password });
  console.log(res.data);
  return res.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
