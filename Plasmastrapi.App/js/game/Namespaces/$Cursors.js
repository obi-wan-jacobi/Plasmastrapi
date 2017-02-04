define([
    "../Tools/Cursors/CuttingToolCursor",
    "../Tools/Cursors/TrashToolCursor",
    "../Tools/PickableTraits/Cuttable",
    "../Tools/PickableTraits/Default",
    "../Tools/PickableTraits/DesignZone",
    "../Tools/PickableTraits/DestructionZone",
    "../Tools/PickableTraits/PickableTraitList",
    "../Tools/PickableTraits/Placeable",
    "../Tools/PickableTraits/Trashable",
    "../Tools/PickableTraits/WireableAsInput",
    "../Tools/PickableTraits/WireableAsOutput",
    "../Tools/CuttingTool",
    "../Tools/NoTool",
    "../Tools/PickingTool",
    "../Tools/PlacingTool",
    "../Tools/TrashTool",
    "../Tools/WireTool"
],
function (
    CuttingToolCursor,
    TrashToolCursor
) {

    return {
        CuttingToolCursor,
        TrashToolCursor
    };
});