import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const loginResponse = (userDataFromDB) => {
  // log.info("auth.dto - userDataFromDB: " + userDataFromDB);
  const { _id, username, email, role, delivery_data, cart } = userDataFromDB;

  return {
    id: _id,
    username,
    email,
    role,
    delivery_data,
    cart,
  };
};
