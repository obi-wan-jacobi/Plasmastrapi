define([
    'ui-debug'
],
    function (debug) {

        $ = { debug };

        $.Button = {
            displayLayer: 'ui-entity-midground'
        };

        /*
        $.MainMenuNavigationPanel = {
            x: 650,
            y: 350,
            width: 1000,
            height: 400,
            displayLayer: 'ondrawuibackground',
            strokeStyle: 'white',
            //fillStyle: 'black',
            lineWidth: 2
        };

        $.MainMenuNavigationPanel.btnCircuitDesigner = {
            x: 650,
            y: 350,
            width: 500,
            height: 50,
            labelText: 'Circuit Designer'
        };

        $.CircuitDesignBlueprintPanel = {
            displayLayer: 'ondrawgamebackground'
        };

        $.SpawnerButton = {
            // image
            imageHandleDisplayLayer: 'ondrawuientities',
            // text-label
            textLabelDisplayLayer: 'ondrawuientities',
            textLabelOffsetBufferY: 3
        };

        $.ToolButton = {
            // image
            imageHandleDisplayLayer: 'ondrawuientities',
            // text-label
            textLabelDisplayLayer: 'ondrawuientities',
            textLabelOffsetBufferY: 3
        };
        */
        
        return $;
    });