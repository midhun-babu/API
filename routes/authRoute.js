import express from "express";
import * as authControl from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/login",authControl.login);
router.post("/register", authControl.register);
router.post("/refresh",authControl.refresh);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile", userId: req.user.id });
});

export default router;
