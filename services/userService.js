import User from "../models/userModel.js";
import * as UserQueries from "../dbqueries/userQueries.js";
import bcrypt from "bcryptjs";


export const createUser = async ({ name, uname, email, password, role }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await User.create({
    name,
    uname,
    email,
    password: hashedPassword,
    role: role || "user",
  });
};

export const fetchUserById = async ({ id }) => {
  const user = await UserQueries.getUserById(id);

  if (!user) throw new Error("User not found");

  return user;
};

export const fetchAllUsers = async () => {
  return await UserQueries.getAllUsers();
};

export const editUser = async (id, updateData) => {
  return await UserQueries.updateUser(id, updateData);
};

export const softDeleteUser= async(id)=>{
  return await UserQueries.deleteUser(id);
}

