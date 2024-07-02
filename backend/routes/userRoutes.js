import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/")
.post(createUser)
.get(authenticate, authorizedAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route('/profile')
.get(authenticate, getCurrentUser)
.put(authenticate, updateCurrentUserProfile);

// Admin Route 
router.route('/:id')
.delete(authenticate, authorizedAdmin, deleteUserById)
.get(authenticate, authorizedAdmin, getUserById)
.put(authenticate, authorizedAdmin, updateUserById);


export default router;
