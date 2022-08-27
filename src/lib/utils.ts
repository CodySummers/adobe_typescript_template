export function findReplaceExpressionComp(comp: CompItem, find: string, replace: string) {

    let count = 0
    const layers = comp.layers

    for (let i = 1; i <= layers.length; i++) {
        const layer = layers[i];
        count += findExpressionLayer(layer, find, replace)
    }

    return count
}

export function findExpressionLayer(layer: any, find: string, replace: string, count = 0) {

    for (let i = 1; i <= layer.numProperties; i++) {
        const property = layer.property(i)
        if (property.canSetExpression && property.expression != '') {
            if (property.expression.includes(find)) {
                const regex = new RegExp(find, 'gm')
                const expression = property.expression.replace(find, replace)
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