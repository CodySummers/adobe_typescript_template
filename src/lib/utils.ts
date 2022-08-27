import { CompLayerObject } from './types'

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