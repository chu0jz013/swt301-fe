import axios from "./axios";
const API_URL = "auth/authenticate";
const login = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.access_token));
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  }
  return "inactive";
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
const authService = {
  login,
  logout,
};
export default authService;
