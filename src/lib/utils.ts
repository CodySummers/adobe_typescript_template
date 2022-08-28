import { CompLayerObject, AEArrayType, TypeSelection } from './types'

export const allLayersByType = (comp: CompItem, type: any, list: CompLayerObject[] = []): { comp: CompItem, layer: AVLayer }[] => {
    for (let i = 1; i <= comp.numLayers; i++) {
        const layer = comp.layers[i] as AVLayer
        if (layer instanceof type) {
            list.push({ comp, layer })
        }
        if (layer.source && layer.source instanceof CompItem) {
            list.concat(allLayersByType(layer.source, type, list))
        }
    }
    return list
}

export const itemsByType = (items: AEArrayType, itemType: TypeSelection) => {
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