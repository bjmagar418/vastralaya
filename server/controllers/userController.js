import uploadFile from "../utils/fileuploader.js";
import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.getAllUsers(userData);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await userService.updateUser(id, data);
    return res.json({ user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(id);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file provided.");
    }

    const user = await userService.updateProfileImage(req.user._id, req.file);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editProfile = async (req, res) => {
  try {
    // 1. Destructure from req.body
    // Note: If sending FormData, numeric/boolean fields might arrive as strings
    const { userId, name, bio, profession, profileImageUrl } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let updateData = { userId, name, bio, profession, profileImageUrl };

    // 2. Handle File Upload if present
    if (req.file) {
      // Ensure uploadFile is an async function that returns an array
      const uploadedFiles = await uploadFile([req.file]);
      if (uploadedFiles && uploadedFiles.length > 0) {
        updateData.profileImageUrl = uploadedFiles[0].url;
      }
    }
    // 3. Update Service
    const updatedUser = await userService.editProfile(updateData);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfileImage,
  editProfile,
};
