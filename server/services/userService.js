import User from "../models/User.js";

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async() =>{
    return await User.find();
}

const getUserById = async(id) =>{
    return await User.findById(id);
}

const updateUser = async(id,data) =>{
    return await User.findByIdAndUpdate(id,data,{new:true});
}

const deleteUser = async(id) =>{
await User.findByIdAndDelete(id);
}

export default { createUser, getAllUsers, getUserById ,updateUser,deleteUser};
