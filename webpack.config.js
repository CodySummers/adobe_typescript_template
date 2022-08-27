const path = require('path');
const dirname = path.resolve()
const packageName = process.env.npm_package_name;
const exec = require('child_process').exec;
const args = process.argv
const application = args[args.length - 1]
const adobeBuildScript = path.join(dirname, 'node_modules', 'adobe-build-scripts', 'bin', 'hostapps.js')
const watchMode = args.some(arg => arg === '--watch')
const { Compilation, sources } = require('webpack');

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
        },
        {
            //Without adding 'this' into the global scope the UI was rendering twice, an empty window and the UI.
            apply(compiler) {
                compiler.hooks.thisCompilation.tap('Replace', (compilation) => {
                    compilation.hooks.processAssets.tap({ name: 'TEST_PLUGIN', stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
                        () => {
                            const fileContent = compilation.getAsset(`${packageName}.jsx`);
                            const newFileContent = 'var panelGlobal = this;\n' + fileContent.source.source()
                            compilation.updateAsset(`${packageName}.jsx`, new sources.RawSource(newFileContent));
                        }
                    );
                });
            }
        }
    ]
};





