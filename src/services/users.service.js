import User from "../models/user.model.js";

const getAllUsers = async () => await User.find().lean();

const getUserById = async (id) => await User.findOne({ _id: id }).exec();

const getUserByEmail = async (email) =>
  await User.findOne({ email: email }).exec();

const updateUserById = async (id, data) =>
  await User.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true });

const updateDeliveryData = async (id, data) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        "delivery_data.first_name": data.first_name,
        "delivery_data.last_name": data.last_name,
        "delivery_data.phone": data.phone,
        "delivery_data.delivery_addresses": [
          {
            address: data.address,
            between_streets: data.between_streets,
            location: data.location,
            additional_data: data.additional_data,
          },
        ],
      },
    },
    {
      new: true,
    },
  );
};

const deleteUserById = async (id) =>
  await User.findByIdAndDelete({ _id: id }).lean();

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
