define([
    "../Tools/Compatibility/Cuttable",
    "../Tools/Compatibility/Pickable",
    "../Tools/Compatibility/DesignZone",
    "../Tools/Compatibility/DestructionZone",
    "../Tools/Compatibility/Draggable",
    "../Tools/Compatibility/Filter",
    "../Tools/Compatibility/Placeable",
    "../Tools/Compatibility/Trashable",
    "../Tools/Compatibility/WireableAsInput",
    "../Tools/Compatibility/WireableAsOutput"
],
function (
    Cuttable,
    Pickable,
    DesignZone,
    DestructionZone,
    Draggable,
    Filter,
    Placeable,
    Trashable,
    WireableAsInput,
    WireableAsOutput
) {

    return {
        Cuttable,
        Pickable,
        DesignZone,
        DestructionZone,
        Draggable,
        Filter,
        Placeable,
        Trashable,
        WireableAsInput,
        WireableAsOutput
    };
});
