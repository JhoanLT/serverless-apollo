import { buildSchema } from "graphql";
import { schemaToTemplateContext } from "graphql-codegen-core";
import { loadTypeSchema } from "../../../utils/schema";
import { mockServer } from "graphql-tools";

describe("Task schema", () => {
	let schema, typeDefs;
	beforeAll(async () => {
		const root = `
            schema {
                query: Query
            }

        `;
		const typeSchemas = await Promise.all(["task"].map(loadTypeSchema));
		typeDefs = root + typeSchemas.join(" ");
		schema = schemaToTemplateContext(buildSchema(typeDefs));
	});

	test("Task has base fields", () => {
		let type = schema.types.find((t) => {
			return t.name === "Task";
		});

		expect(type).toBeTruthy();

		const baseFields = {
			name: "String!",
			description: "String",
		};

		type.fields.forEach((field) => {
			const type = baseFields[field.name];
			expect(field.raw).toBe(type);
		});
	});

	test("Task query", async () => {
		const server = mockServer(typeDefs);
		const query = `{
          task {
			name
            description
          }
        }
      `;
		await expect(server.query(query)).resolves.toBeTruthy();
		const { errors } = await server.query(query);
		expect(errors).not.toBeTruthy();
	});

	test("Tasks query", async () => {
		const server = mockServer(typeDefs);
		const query = `{
                tasks {
					name
                    description
                }
            }
        `;
		await expect(server.query(query)).resolves.toBeTruthy();
		const { errors } = await server.query(query);
		expect(errors).not.toBeTruthy();
	});

	test("TaskInput has correct fields", () => {
		const input = schema.inputTypes.find((i) => i.name === "TaskInput");

		expect(input).toBeTruthy();

		const fields = {
			name: "String!",
			description: "String",
		};
		input.fields.forEach((field) => {
			const type = fields[field.name];
			expect(field.raw).toBe(type);
		});
	});
});
