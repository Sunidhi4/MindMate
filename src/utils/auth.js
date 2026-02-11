export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUserRole = () => {
  return localStorage.getItem("role"); // "user" or "expert"
};
export const isAuthenticated = () => {
  return !!getToken();
};
