import { ExtendedEditText } from '../types'
import { expressionPropLayerComp } from '../expressionFunctons';
import { handlePlaceholder } from './uiUtils'

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
    findText.placeholder = "Find:     "
    findText.text = findText.placeholder;

    const replaceText = palette.add('edittext {properties: {name: "replaceText"}}') as ExtendedEditText
    replaceText.placeholder = "Replace:     "
    replaceText.text = replaceText.placeholder;

    const runButton = palette.add("button", undefined, undefined, { name: "runButton" });
    runButton.text = "Find Replace Expressions";

    const amends = palette.add('statictext {properties: {name: "amends"}}') as ExtendedEditText
    amends.justify = "center"
    amends.text = "";

    handlePlaceholder(findText)
    handlePlaceholder(replaceText)

    runButton.onClick = () => {
        try {
            const find = findText.text === findText.placeholder ? '' : findText.text
            const replace = replaceText.text === replaceText.placeholder ? '' : replaceText.text

            let count
            if (find === '') {
                count = 0
            } else {
                count = expressionPropLayerComp(find, replace)
            }

            amends.text = `${count} ${count === 1 ? 'expression' : 'expressions'} amended`;
        }
        catch (error: any) {
            alert(error)
        }
    }

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    //@ts-ignore
    if (palette instanceof Window) palette.show();

    return palette;

}