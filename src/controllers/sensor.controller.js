import Sensor from "../models/sensor.model.js";

// Create sensor
export const createSensor = async (req, res) => {
  try {
    const sensor = await Sensor.create(req.body);
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

// Get sensor by ID
export const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ success: false, message: "Sensor not found" });
    }
    return res.status(200).json({ success: true, sensor });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
