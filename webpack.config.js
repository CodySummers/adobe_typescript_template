const path = require('path');
const packageName = process.env.npm_package_name;

module.exports = {
    target: ['web', 'es3'],
    entry: ['es5-shim', './src/index.ts'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: `${packageName}.jsx`,
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false,
      },
};