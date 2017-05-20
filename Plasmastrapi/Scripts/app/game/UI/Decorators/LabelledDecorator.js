define([
    // UI
    'text-label'
],
    function (TextLabel) {

        function LabelledDecorator(textLabelDisplayOptions) {
            this.label = new TextLabel(this, textLabelDisplayOptions);
        };

        return LabelledDecorator;
    });