import { Router } from "express";
import { createSensor, getSensors, getSensorsByUserId, getSensorById } from "../controllers/sensor.controller.js";

const router = Router();

router.post("/", createSensor);
router.get("/", getSensors);
router.get("/by-user", getSensorsByUserId);
// Only match MongoDB ObjectId-like ids so paths like `/by-user` never fall through here.
router.get("/:id([0-9a-fA-F]{24})", getSensorById);

export default router;
