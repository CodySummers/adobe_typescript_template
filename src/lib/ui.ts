import { ExtendedEditText } from './types'
import { handleText, findReplaceExpressionComp } from './utils';

export const findAndReplaceExpressionUI = () => {

    // PALETTE
    // =======
    //@ts-ignore
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { resizeable: true }) as Panel;
    //@ts-ignore
    if (!(panelGlobal instanceof Panel)) palette.text = "Find Replace Expressions";
    palette.orientation = "column";
    palette.alignChildren = ["fill", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    const findText = palette.add('edittext {properties: {name: "findText"}}') as ExtendedEditText;
    findText.name = "findText"
    findText.text = "Find:";

    const replaceText = palette.add('edittext {properties: {name: "replaceText"}}') as ExtendedEditText
    replaceText.name = "replaceText"
    replaceText.text = "Replace:";

    const runButton = palette.add("button", undefined, undefined, { name: "runButton" });
    runButton.text = "Find Replace Expressions";

    const amends = palette.add('statictext {properties: {name: "amends"}}') as ExtendedEditText
    amends.justify = "center"
    amends.text = "";

    handleText(findText, replaceText)

    runButton.onClick = () => {
        const comp = app.project.activeItem
        if (!(comp instanceof CompItem)) return
        const find = findText.text
        const replace = replaceText.text
        if (find === '' || find === 'Find:' || replace === '' || replace === 'Replace:') return
        const count = findReplaceExpressionComp(comp, find, replace)
        amends.text = `${count} ${count === 1 ? 'expression' : 'expressions'} amended`;
    }

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    //@ts-ignore
    if (palette instanceof Window) palette.show();

    return palette;

}