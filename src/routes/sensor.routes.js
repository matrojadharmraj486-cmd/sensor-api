import { Router } from "express";
import { createSensor, getSensors, getSensorsByUserId, getSensorById } from "../controllers/sensor.controller.js";

const router = Router();

router.post("/", createSensor);
router.get("/", getSensors);
router.get("/by-user", getSensorsByUserId);
router.get("/:id", getSensorById);

export default router;
