import User from "../models/User.js";
import uploadFile from "../utils/fileuploader.js";

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
};


const updateProfileImage = async(id,file) =>{
const uploadedFiles = await uploadFile([file]);

return await User.findByIdAndUpdate(id,{
  profileImageUrl:uploadedFiles[0].url,
},{new:true});
}

const editProfile = async ({
  userId,
  name,
  profileImageUrl,
  bio,
  profession,
}) => {
  // 1. Build an atomic update object containing only fields explicitly passed
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (profileImageUrl !== undefined)
    updateData.profileImageUrl = profileImageUrl;
  if (bio !== undefined) updateData.bio = bio;
  if (profession !== undefined) updateData.profession = profession;

  // 2. Perform a targeted atomic update, bypassing full-document .save() rules
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: false }, // Prevents whole-document validation conflicts
  );

  if (!updatedUser) {
    throw { status: 404, message: "User not found" };
  }

  // 3. Return the fresh document fields back to your controller
  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    profileImageUrl: updatedUser.profileImageUrl,
    bio: updatedUser.bio,
    profession: updatedUser.profession,
    role: updatedUser.role,
    isActive: updatedUser.isActive,
    address: updatedUser.address,
    createdAt: updatedUser.createdAt,
  };
};

export default { createUser, getAllUsers, getUserById ,updateUser,deleteUser,updateProfileImage,editProfile};
