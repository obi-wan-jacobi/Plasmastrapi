define([
    "../Tools/PickableTraits/Cuttable",
    "../Tools/PickableTraits/Default",
    "../Tools/PickableTraits/DesignZone",
    "../Tools/PickableTraits/DestructionZone",
    "../Tools/PickableTraits/Draggable",
    "../Tools/PickableTraits/PickableTraitList",
    "../Tools/PickableTraits/Placeable",
    "../Tools/PickableTraits/Trashable",
    "../Tools/PickableTraits/WireableAsInput",
    "../Tools/PickableTraits/WireableAsOutput"
],
function (
    Cuttable,
    Default,
    DesignZone,
    DestructionZone,
    Draggable,
    PickableTraitList,
    Placeable,
    Trashable,
    WireableAsInput,
    WireableAsOutput
) {

    return {
        Cuttable,
        Default,
        DesignZone,
        DestructionZone,
        Draggable,
        PickableTraitList,
        Placeable,
        Trashable,
        WireableAsInput,
        WireableAsOutput
    };
});
