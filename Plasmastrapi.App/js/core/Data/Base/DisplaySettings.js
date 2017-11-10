define(['core-constants', 'validator'], function (CORE, validator) {

    function DisplaySettings(displayLayer) {
        if (!(CORE.DISPLAY_LAYERS.indexOf(displayLayer) > -1)) {
            validator.throw(this, 'constructor', `Display configurations missing for display layer: ${displayLayer}`);
        }
        this.displayLayer = displayLayer;
    };

    return DisplaySettings;
});