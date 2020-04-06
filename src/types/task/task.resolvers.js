import { Task } from "./task.model";

const tasks = (_, args, ctx) => {
	return Task.find().exec();
};

const task = (_, args, ctx) => {
	return Task.findOne().exec();
};

const newTask = (_, args, ctx) => {
	return Task.create({ ...args.input });
};

export default {
	Query: {
		tasks,
		task,
	},
	Mutation: {
		newTask,
	},
};
