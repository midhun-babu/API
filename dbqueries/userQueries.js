import User from "../models/userModel.js";

export const insertUser = async (userData) => {
  return await User.create(userData);
};
export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select("-password");
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData);
};

export const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isdeleted: true });
};

export const permanentDelete = async (id) => {
  return await User.findByIdAndDelete(id);
};



export const findUserByIdentifier = async (identifier) => {
  return await User.findOne({ email: identifier}).select("-password");
};



export const findUserForLogin = async (identifier) => {
  return await User.findOne({
    $or: [
      { email: { $regex: `^${identifier}$`, $options: "i" } },
      { uname: { $regex: `^${identifier}$`, $options: "i" } }
    ],
  }); 
};

