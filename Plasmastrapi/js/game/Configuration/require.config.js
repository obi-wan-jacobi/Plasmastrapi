﻿require.config({
    paths: {
        // Assets
        'asset-urls': './game/Assets/assetUrls',
        // Containers
        'logic-element-container': './game/Containers/LogicElementContainer',
        'wire-container': './game/Containers/WireContainer',
        // Controllers
        'scene-controller': './game/Controllers/SceneController',
        'tool-controller': './game/Controllers/ToolController',
        // Scenes
        'circuit-design-scene': './game/Scenes/CircuitDesignScene',
        'main-menu-scene': './game/Scenes/MainMenuScene',
        // Tools
        'compatible': './game/Tools/Base/Compatible',
        'cursor': './game/Tools/Base/Cursor',
        'tool': './game/Tools/Base/Tool',
        'cuttable': './game/Tools/Compatibility/Cuttable',
        'design-zone': './game/Tools/Compatibility/DesignZone',
        'destruction-zone': './game/Tools/Compatibility/DestructionZone',
        'draggable': './game/Tools/Compatibility/Draggable',
        'filter': './game/Tools/Compatibility/Filter',
        'pickable': './game/Tools/Compatibility/Pickable',
        'placeable': './game/Tools/Compatibility/Placeable',
        'trashable': './game/Tools/Compatibility/Trashable',
        'wireable-as-input': './game/Tools/Compatibility/WireableAsInput',
        'wireable-as-output': './game/Tools/Compatibility/WireableAsOutput',
        'cutting-tool-cursor': './game/Tools/Cursors/CuttingToolCursor',
        'trash-tool-cursor': './game/Tools/Cursors/TrashToolCursor',
        'selection-box': './game/Tools/Helpers/SelectionBox',
        'cutting-tool': './game/Tools/CuttingTool',
        'picking-tool': './game/Tools/PickingTool',
        'placing-tool': './game/Tools/PlacingTool',
        'trash-tool': './game/Tools/TrashTool',
        'wire-tool': './game/Tools/WireTool',
        // Configs
        'game-debug': './game/debug',
        'game-config': './game/config',
        // Base
        'game': './game/Game'
    }
});