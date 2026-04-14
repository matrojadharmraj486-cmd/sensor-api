import Sensor from "../models/sensor.model.js";
import mongoose from "mongoose";

// Create sensor
export const createSensor = async (req, res) => {
  try {
    const { userId, userIds, deviceId, ...rest } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "deviceId is required" });
    }

    const incomingUserIds = [];
    if (typeof userId === "string" && userId.trim()) incomingUserIds.push(userId.trim());
    if (Array.isArray(userIds)) {
      for (const id of userIds) {
        if (typeof id === "string" && id.trim()) incomingUserIds.push(id.trim());
      }
    }

    const update = {
      $set: { ...rest, deviceId }
    };

    if (incomingUserIds.length > 0) {
      update.$addToSet = { userIds: { $each: [...new Set(incomingUserIds)] } };
    }

    // "Create" behaves like upsert-by-deviceId; userIds are appended (deduped) instead of overwritten.
    const sensor = await Sensor.findOneAndUpdate({ deviceId }, update, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });

    return res.status(201).json({ success: true, sensor });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// List all sensors
export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    return res.status(200).json({ success: true, sensors });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get sensors by userId (query param)
export const getSensorsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query param is required" });
    }

    const sensors = await Sensor.find({ userIds: userId });
    return res.status(200).json({ success: true, sensors });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get sensor by ID
export const getSensorById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid sensor id" });
    }

    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ success: false, message: "Sensor not found" });
    }
    return res.status(200).json({ success: true, sensor });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
