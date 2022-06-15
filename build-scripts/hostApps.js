const { platform } = require('os')
const { exec } = require('child_process');
const path = require('path')
const dirname = path.resolve()
const packageName = process.env.npm_package_name;
const args = process.argv

const hostApps = (appExe, scriptFile, activate = '') => {

    //https://github.com/rendertom/VSCode-Adobe-Script-Runner.git

    return {
        ae: {
            shortName: 'ae',
            appName: 'Adobe After Effects',
            darwin: `osascript -e 'tell application id "com.adobe.aftereffects" to ${activate} DoScriptFile "${scriptFile}" with override'`,
            win32: `"${appExe}" -r ${scriptFile}`,
        },
        ai: {
            shortName: 'ai',
            appName: 'Adobe Illustrator',
            darwin: `osascript -e 'tell application id "com.adobe.illustrator" to ${activate} do javascript file "${scriptFile}"'`,
            win32: `"{appExe}" -r {scriptFile}`,
            appExe: 'winIllustratorExe',
        },
        estk: {
            shortName: 'estk',
            appName: 'Adobe ExtendScript Toolkit',
            darwin: `osascript -e 'tell application id "com.adobe.estoolkit-4.0" to ${activate} open "${scriptFile}"'`,
            win32: `"{appExe}" -run {scriptFile}`,
            appExe: 'winExtendscriptToolkitExe',
        },
        ic: {
            shortName: 'ic',
            appName: 'Adobe InCopy',
            darwin: `osascript -e 'tell application id "com.adobe.InCopy" to ${activate} do script "${scriptFile}" language javascript'`,
            win32: `powershell -command "$app = new-object -comobject InCopy.Application; $app.DoScript('${scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
        },
        id: {
            shortName: 'id',
            appName: 'Adobe InDesign',
            darwin: `osascript -e 'tell application id "com.adobe.InDesign" to ${activate} do script "${scriptFile}" language javascript'`,
            win32: `powershell -command "$app = new-object -comobject InDesign.Application; $app.DoScript('${scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
        },
        ps: {
            shortName: 'psd',
            appName: 'Adobe Photoshop',
            appExe: 'winPhotoshopExe',
            darwin: `osascript -e 'tell application id "com.adobe.photoshop" to ${activate} do javascript file "${scriptFile}"'`,
            win32: `"${appExe}" -r ${scriptFile}`,

        },
    }
}

const appExe = 'C:/Program Files/Adobe/Adobe After Effects 2022/Support Files/AfterFX'
const script = `${dirname}/dist/${packageName}.jsx`
const program = hostApps(appExe, script)[args[args.length - 1]]
const exe = program[platform()];

console.log(`Running ${packageName}.jsx in ${program.appName}...`)
exec(exe);