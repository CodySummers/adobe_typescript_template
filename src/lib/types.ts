export type ExtendedEditText = EditText & { placeholder: string }

export type AEArrayType = ItemCollection | _ItemClasses[]
export type TypeSelection = typeof AVItem | typeof CompItem | typeof FolderItem | typeof FootageItem

export interface CompLayerObject {
    comp: CompItem,
    layer: AVLayer
}