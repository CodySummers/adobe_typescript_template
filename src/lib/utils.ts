import { AEArrayType, TypeSelection } from "./types";

export const testAlert = (text: string) => {
    alert(text)
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