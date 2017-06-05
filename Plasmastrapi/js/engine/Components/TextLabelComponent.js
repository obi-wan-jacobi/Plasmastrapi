define(['component', 'position', 'pose-component'],
function (Component, Position, PoseComponent) {

        // CLASS TextLabelComponent
        TextLabelComponent.prototype = Object.create(Component.prototype);
        TextLabelComponent.prototype.constructor = TextLabelComponent;
        function TextLabelComponent(textLabelHandle) {
            // inherits from
            Component.call(this, textLabelHandle);
            // apply mixins
            Component.Mixins.Drawable.call(this);
        };

        return TextLabelComponent;
    });