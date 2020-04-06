const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
	entry: slsw.lib.entries,
	target: "node",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: [{ loader: "graphql-tag/loader" }]
			}
		]
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, ".webpack"),
		filename: "[name].js"
	}
};
