// auth helper functions
// duplicate localStorage code avoid karne ke liye

export const saveAuthData = (token, role) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("role", role);
};

export const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};