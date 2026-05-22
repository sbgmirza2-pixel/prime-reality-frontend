import api from "./api";

// auth APIs
// login/register yahan handle honge

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};