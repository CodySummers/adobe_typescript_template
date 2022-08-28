import { ExtendedEditText, AEArrayType, TypeSelection } from "./types";

export function findExpressionProperty(property: any, find: string, replace: string, count = 0) {
    if (property.canSetExpression && property.expression != '') {
        if (property.expression.includes(find)) {
            const regex = new RegExp(`(.?)${find}(.?)`, 'gm')
            const expression = property.expression.replace(regex, `$1${replace}$2`)
            property.expression = expression
            count++
        }
    }
    return count
}

export const findExpressionLayer = (layer: any, find: string, replace: string, seen: { [key: string]: boolean } = {}, count = 0) => {

    for (let i = 1; i <= layer.numProperties; i++) {
        const property = layer.property(i)
        count += findExpressionProperty(property, find, replace)
        if (property.numProperties > 0) {
            count = findExpressionLayer(property, find, replace, seen, count)
        }
    }

    if (layer.source && layer.source instanceof CompItem && !seen[layer.source.id]) {
        seen[layer.source.id] = true
        count += findReplaceExpressionComp(layer.source, find, replace)
    }

    return count
}

export const findReplaceExpressionComp = (comp: CompItem, find: string, replace: string, seen: { [key: string]: boolean } = {}) => {

    let count = 0
    const layers = comp.layers
    for (let i = 1; i <= layers.length; i++) {
        const layer = layers[i];
        count += findExpressionLayer(layer, find, replace, seen)
    }

    return count
}

const itemsByType = (items: AEArrayType, itemType: TypeSelection) => {
    const start = (items instanceof ItemCollection || items instanceof LayerCollection) ? 1 : 0
    const end = start === 0 ? -1 : 0

    const typeItems = []
    for (let i = start; i <= items.length - end; i++) {
        const item = items[i]
        if (!(item instanceof itemType)) continue
        typeItems.push(item)
    }

    return typeItems
}

export const expressionPropLayerComp = (find: string, replace: string) => {

    app.beginUndoGroup('Find Replace Expression')

    const project = app.project
    const items = project.items
    const selectedItems = project.selection
    const activeComp = project.activeItem

    let comps: CompItem[] = []

    if (activeComp && activeComp instanceof CompItem) {

        const selectedLayers = activeComp.selectedLayers
        const selectedProperties = activeComp.selectedProperties
        if (selectedProperties.length > 0) {
            return selectedProperties.reduce((total, property) => total + findExpressionProperty(property, find, replace), 0)
        } else if (selectedLayers.length > 0) {
            return selectedLayers.reduce((total, layer) => total + findExpressionLayer(layer, find, replace), 0)
        } else {
            return findReplaceExpressionComp(activeComp, find, replace)
        }


    } else if (selectedItems.length > 0) {
        comps = itemsByType(selectedItems, CompItem) as CompItem[]
    } else {
        comps = itemsByType(items, CompItem) as CompItem[]
    }

    const count = comps.reduce((total, comp) => total + findReplaceExpressionComp(comp, find, replace), 0)

    return count
}

const handlePlaceholderFocus = (textProp: ExtendedEditText) => {
    if (textProp.text === textProp.placeholder) {
        textProp.text = ''
    } else if (textProp.text === '') {
        textProp.text = textProp.placeholder
    }
}

export const handlePlaceholder = (textProp: ExtendedEditText) => {

    textProp.onActivate = () => { handlePlaceholderFocus(textProp) }
    textProp.onDeactivate = () => { handlePlaceholderFocus(textProp) }

}