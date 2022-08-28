import { allLayersByType } from './utils'

export const allLayerTypesUI = () => {

    let compLayers: { comp: CompItem, layer: AVLayer }[]

    let index = -1
    const nextPrevious = (dir: number) => {
        const max = compLayers.length

        if (max === 0) {
            const comp = app.project.activeItem
            if (comp instanceof CompItem) {
                compLayers = allLayersByType(comp, types[type.selection.index])
            } else {
                return
            }
        }

        index += dir
        if (index < 0) {
            index = max - 1
        } else if (index >= max) {
            index = 0
        }

        for (; index < max && index >= 0; index += dir) {
            try {
                const viewer = compLayers[index].comp.openInViewer()
                if (!viewer) throw 'Cannot find Comp';

                const command = app.findMenuCommandId('Deselect All')
                app.executeCommand(command)
                compLayers[index].layer.selected = true;
                break;
            }
            catch (err) {
                continue
            }
        }
    }


    // PALETTE
    // =======
    //@ts-ignore
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { resizeable: true }) as any

    palette.orientation = "column";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    // TYPEGROUP
    // =========
    var typeGroup = palette.add("group", undefined, { name: "typeGroup" });
    typeGroup.orientation = "row";
    typeGroup.alignChildren = ["left", "center"];
    typeGroup.spacing = 10;
    typeGroup.margins = 0;

    const types = [AVLayer, CameraLayer, LightLayer, ShapeLayer, TextLayer]
    const types_array = ["AV Layer", "Camera Layer", "Light Layer", "Shape Layer", "Text Layer"];
    var type = typeGroup.add("dropdownlist", undefined, undefined, { name: "types", items: types_array });
    type.selection = 4;

    var refresh = typeGroup.add("button", undefined, undefined, { name: "refresh" });
    refresh.text = "refresh";


    // ARRORS
    // ======
    var arrows = palette.add("group", undefined, { name: "arrors" });
    arrows.orientation = "row";
    arrows.alignChildren = ["left", "center"];
    arrows.spacing = 10;
    arrows.margins = 0;

    var left = arrows.add("button", undefined, undefined, { name: "left" });
    left.text = "<";

    var right = arrows.add("button", undefined, undefined, { name: "right" });
    right.text = ">";

    var layersFound = palette.add("statictext", undefined, undefined, { name: "layersFound" }) as StaticText
    layersFound.text = ''
    layersFound.minimumSize.width = 230
    layersFound.justify = 'center'

    right.onClick = () => { nextPrevious(1) }
    left.onClick = () => { nextPrevious(-1) }

    const refreshLayers = () => {
        index = -1
        const comp = app.project.activeItem
        if (comp instanceof CompItem) {
            compLayers = []
            compLayers = allLayersByType(comp, types[type.selection.index])
            const length = compLayers.length
            layersFound.text = `${length} ${length === 1 ? 'Layer' : 'Layers'} Found`
        }
    }

    refreshLayers()

    refresh.onClick = refreshLayers
    type.onChange = refreshLayers

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    //@ts-ignore
    if (palette instanceof Window) palette.show();

    return palette;

};