import express from "express";
import {
  addAddress,
  getMyAddresses,
  makeDefault,
  updateMyAddress
} from "../controllers/addressController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", addAddress);
router.get("/", getMyAddresses);
router.put("/:id", updateMyAddress);
router.patch("/default/:id", makeDefault);

export default router;