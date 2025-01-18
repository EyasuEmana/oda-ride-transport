import { jwtDecode } from "jwt-decode";
export const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};

export const authHeader = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export const getUserRole = () => {
  const accessToken = getAccessToken();
  const decodedToken = jwtDecode(accessToken);
  const { role } = decodedToken;
  return role;
};

export const isUserAuthenticated = () => {
  try {
    return getAccessToken() !== null && getUserRole() === "user";
  } catch (error) {
    return false;
  }
};

export const isAdminAuthenticated = () => {
  try {
    return getAccessToken() !== null && getUserRole() === "admin";
  } catch (error) {
    return false;
  }
};
