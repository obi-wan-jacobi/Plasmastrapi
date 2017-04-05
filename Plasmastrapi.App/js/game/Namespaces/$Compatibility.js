define([
    "../Tools/PickableTraits/Cuttable",
    "../Tools/PickableTraits/Pickable",
    "../Tools/PickableTraits/DesignZone",
    "../Tools/PickableTraits/DestructionZone",
    "../Tools/PickableTraits/Draggable",
    "../Tools/PickableTraits/Filter",
    "../Tools/PickableTraits/Placeable",
    "../Tools/PickableTraits/Trashable",
    "../Tools/PickableTraits/WireableAsInput",
    "../Tools/PickableTraits/WireableAsOutput"
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
