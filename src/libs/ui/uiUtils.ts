import { ExtendedEditText } from "../types"

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