import { findReplaceExpressionComp } from "./lib/utils"

const comp = app.project.activeItem
if (comp && comp instanceof CompItem) {
    let count = findReplaceExpressionComp(comp, '"NotoSansThai-Regular"', '"NotoSansThai-Medium"')
    alert(`Amended ${count} ${count === 1 ? 'expression' : 'expressions'}`)
    count = findReplaceExpressionComp(comp, '"NotoSansThai-Bold"', '"NotoSansThai-SemiBold"')
    alert(`Amended ${count} ${count === 1 ? 'expression' : 'expressions'}`)
}
