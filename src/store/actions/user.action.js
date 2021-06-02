const login = (user) => {
  return { type: "LOGIN", user };
};
const logout = () => {
  return { type: "LOGOUT" };
};

export const userActions = {
  login,
  logout,
};
