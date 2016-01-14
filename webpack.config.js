const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const Clean = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const pkg = require("./package.json");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, "app"),
	build: path.join(__dirname, "build")
};
process.env.BABEL_ENV = TARGET;

var targetSpecific = {};
if(TARGET === "start") {
	targetSpecific = {
		output: {
			filename: "[name].[hash]-[id].js",
		},
		devtool: "eval-source-map",
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// display only errors to reduce the amount of output
			stats: "errors-only",

			// parse host and port from env so this is easy
			// to customize
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	};
}

if(TARGET === "build" || !TARGET) {
	targetSpecific = {
		plugins: [
			new Clean([PATHS.build]),
		]
	};
}


const common = {
	resolve: {
		extensions: ["", ".js", ".jsx", "es6"]
	},
	entry: {
		authorization: PATHS.app + "/page/Authorization.jsx",
		profile: PATHS.app + "/page/Profile.jsx",
		search: PATHS.app + "/page/Search.jsx",
	},
	//entry: path.join(PATHS.app, "page"),
	react: {
		"react": "react",
		"react-dom": "react-dom",
	},
	vendor: Object.keys(pkg.dependencies).filter(function(v) {
		// Exclude alt-utils as it won"t work with this setup
		// due to the way the package has been designed
		// (no package.json main).
		return v !== "alt-utils";
	}),
	output: {
		path: PATHS.build,
		filename: "[name].[chunkhash].js",
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ["style", "css"],
				include: PATHS.app
			},
			{
				test: /\.jsx?$/,
				loaders: ["babel?cacheDirectory"],
				include: PATHS.app
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ["react"]
		}),
		new HtmlwebpackPlugin({
			chunks: ["authorization", "react"],
			template: "node_modules/html-webpack-template/index.html",
			filename: "authorization.html",
			title: "SmartCAT Web Test: Authorization",
			appMountId: "app"
		}),
		new HtmlwebpackPlugin({
			chunks: ["profile", "react"],
			template: "node_modules/html-webpack-template/index.html",
			filename: "profile.html",
			title: "SmartCAT Web Test: Profile",
			appMountId: "app"
		}),
		new HtmlwebpackPlugin({
			chunks: ["search", "react"],
			template: "node_modules/html-webpack-template/index.html",
			filename: "search.html",
			title: "SmartCAT Web Test: Search",
			appMountId: "app"
		}),
	]
};

module.exports = merge(common, targetSpecific);
