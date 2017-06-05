define([
    // Data
    'text-label'
],
function (TextLabel) {

    function LabelDecorator(TextDisplaySettings) {
        this.label = new TextLabel(this, TextDisplaySettings);
    };

    return LabelDecorator;
});