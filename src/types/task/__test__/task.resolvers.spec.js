import resolvers from "../task.resolvers";
import mongoose from "mongoose";
import { Task } from "../task.model";

describe("Task resolvers", () => {
	test("newTask creates a new task from args", async () => {
		const args = {
			input: {
				name: "Monster v5 bike",
				description: "450",
			},
		};

		const result = await resolvers.Mutation.newTask(null, args);

		Object.keys(args.input).forEach((field) => {
			expect(result[field]).toBe(args.input[field]);
		});
	});
});
