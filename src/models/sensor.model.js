import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  date: String,
  time: String,
  temperature: Number,
  humidity: Number
});

const sensorSchema = new mongoose.Schema({
  name: String,
  deviceId: String,
  deviceType: String,
  temperature: Number,
  humidity: Number,
  lastSeen: String,
  dataPoints: Number,
  logs: [logSchema]
});

export default mongoose.model("Sensor", sensorSchema);
