const path = require('path');
const dirname = path.resolve()
const packageName = process.env.npm_package_name;
const exec = require('child_process').exec;
const args = process.argv
const application = args[args.length - 1]
const adobeBuildScript = path.join(dirname, 'node_modules', 'adobe-build-scripts', 'bin', 'hostapps.js')
const watchMode = args.some(arg => arg === '--watch')

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
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    if (watchMode) {
                        exec(`node ${adobeBuildScript} ${application}`, (err, stdout, stderr) => {
                            if (stdout) process.stdout.write(stdout);
                            if (stderr) process.stderr.write(stderr);
                        });
                    }
                });
            }
        }
    ]
};





