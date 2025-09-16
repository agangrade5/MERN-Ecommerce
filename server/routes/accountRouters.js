import { Router } from "express";

import { logout, changePassword, getProfile, updateProfile, changeAvatar, deleteAccount } from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/logout', authMiddleware, logout);
router.post('/change-password', authMiddleware, changePassword);
router.get('/get-profile', authMiddleware, getProfile);
router.post('/update-profile', authMiddleware, updateProfile);
router.post('/change-avatar', authMiddleware, changeAvatar);
router.delete('/delete-account', authMiddleware, deleteAccount);

export default router;
