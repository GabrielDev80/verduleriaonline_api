export const loginResponse = (userDataFromDB) => {
  const { _id, username, email, role } = userDataFromDB;

  return {
    id: _id,
    username,
    email,
    role,
  };
};
