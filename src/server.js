const { ApolloServer } = require("apollo-server-lambda");
import { loadTypeSchema } from "./utils/schema";
import task from "./types/task/task.resolvers";
import config from "./config";
import { connect } from "./db";
import { merge } from "lodash";

const types = ["task"];

const createHandler = async () => {
	const rootSchema = `
    schema {
	  query: Query
	  mutation: Mutation
    }
  `;
	const schemaTypes = await Promise.all(types.map(loadTypeSchema));
	const server = new ApolloServer({
		typeDefs: [rootSchema, ...schemaTypes],
		resolvers: merge({}, task),
		context: ({ event, context }) => ({
			headers: event.headers,
			functionName: context.functionName,
			event,
			context,
		}),
		playground: true,
		introspection: true,
	});
	await connect(config.dbUrl);
	return server.createHandler({
		cors: {
			origin: "*",
			credentials: true,
		},
	});
};

exports.handler = (event, context, callback) => {
	createHandler().then((handler) => handler(event, context, callback));
};
