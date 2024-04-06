export const authHeader = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  },
});
