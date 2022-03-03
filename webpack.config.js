const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// 提升兼容性
		environment: {
			arrowFunction: false,
			const: false,
		},
	},
	// Webpack 打包时要用的模块
	module: {
		// 加载规则
		rules: [
			{
				// 规则生效范围
				test: /\.ts$/,
				// 指定 loader
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									// 插件环境
									'@babel/preset-env',
									{
										targets: {
											'chrome': '58',
											'ie': '11',
										},
										// corejs 版本
										'corejs': '3',
										// 使用 corejs 方式, usage表示 按需加载
										'useBuiltIns': 'usage',
									},
								],
							],
						},
					},
					'ts-loader',
				],
				exclude: '/node-modules',
			},

			// 指定 less 文件处理方式
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											browsers: 'last 2 versions',
										},
									],
								],
							},
						},
					},
					'less-loader',
				],
			},
		],
	},

	// Webpack 插件
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'src/index.html',
		}),
	],

	// 查找 ts 导入 ts
	resolve: {
		extensions: ['.ts', '...'],
	},

	// mode: 'development',
	mode: 'production',
};
