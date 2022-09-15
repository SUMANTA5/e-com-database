import express from "express";
import { registerControllers } from "../controllers";

const router = express.Router();

router.post("/register", registerControllers.register);

export default router;
