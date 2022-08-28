import { ExtendedEditText } from "./types";

export function findReplaceExpressionComp(comp: CompItem, find: string, replace: string) {

    app.beginUndoGroup('Find Replace Expression')

    let count = 0
    const layers = comp.layers

    for (let i = 1; i <= layers.length; i++) {
        const layer = layers[i];
        count += findExpressionLayer(layer, find, replace)
    }

    app.endUndoGroup()

    return count
}

export function findExpressionLayer(layer: any, find: string, replace: string, count = 0) {

    for (let i = 1; i <= layer.numProperties; i++) {
        const property = layer.property(i)
        if (property.canSetExpression && property.expression != '') {
            if (property.expression.includes(find)) {
                const regex = new RegExp(`(.?)${find}(.?)`, 'gm')
                const expression = property.expression.replace(regex, `$1${replace}$2`)
                property.expression = expression
                count++
            }
        }
        if (property.numProperties > 0) {
            count = findExpressionLayer(property, find, replace, count)
        }
    }
    return count
}

export const handleText = (findText: ExtendedEditText, replaceText: ExtendedEditText) => {

    const handleTextFocus = (textProp: ExtendedEditText) => {
        if (textProp.text === 'Find:' || textProp.text === 'Replace:') {
            textProp.text = ''
        } else if (textProp.text === '' && textProp.name === 'findText') {
            textProp.text = 'Find:'
        } else if (textProp.text === '' && textProp.name === 'replaceText') {
            textProp.text = 'Replace:'
        }
    }

    findText.onActivate = () => { handleTextFocus(findText) }
    findText.onDeactivate = () => { handleTextFocus(findText) }
    replaceText.onActivate = () => { handleTextFocus(replaceText) }
    replaceText.onDeactivate = () => { handleTextFocus(replaceText) }

}