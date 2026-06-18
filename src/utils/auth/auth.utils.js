export const normalizedUserData = async (userData) => ({
  username: userData.username.trim(),
  email: userData.email.trim().toLowerCase(),
  password: userData.password,
});
