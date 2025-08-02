export const saveUserToStorage = (user) => {
  localStorage.setItem("rentcheck_user", JSON.stringify(user));
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("rentcheck_user"));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("rentcheck_user");
};

export const isAuthenticated = () => {
  const user = getUserFromStorage();
  return !!user?.token;
};
