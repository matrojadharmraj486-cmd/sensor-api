import { Router } from "express";
import { createSensor, getSensors, getSensorById } from "../controllers/sensor.controller.js";

const router = Router();

router.post("/", createSensor);
router.get("/", getSensors);
router.get("/:id", getSensorById);

export default router;
