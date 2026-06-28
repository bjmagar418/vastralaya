import userController from "../controllers/userController.js";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/",userController.createUser);
router.get("/", userController.getAllUsers);

router.put("/profile-image", userController.updateProfileImage);
router.patch(
  "/edit-profile",
  upload.single("profileImage"),
  userController.editProfile,
);


router.post("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);



export default router;
