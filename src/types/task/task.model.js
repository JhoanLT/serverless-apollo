import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
});

export const Task = mongoose.model("task", taskSchema);
