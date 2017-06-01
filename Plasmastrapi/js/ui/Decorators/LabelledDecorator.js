define([
    // UI
    'text-label'
],
    function (TextLabel) {

        function LabelledDecorator(TextDisplaySettings) {
            this.label = new TextLabel(this, TextDisplaySettings);
        };

        return LabelledDecorator;
    });