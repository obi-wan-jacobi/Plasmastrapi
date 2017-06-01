define(['component', 'position', 'pose-component'],
function (Component, Position, PoseComponent) {

        // CLASS TextLabelComponent
        TextLabelComponent.prototype = Object.create(Component.prototype);
        TextLabelComponent.prototype.constructor = TextLabelComponent;
        function TextLabelComponent(TextDisplaySettings) {
            // inherits from
            Component.call(this);
            // private variables
            this.__options = TextDisplaySettings;
            Component.Mixins.Drawable.call(this, this.__options.displayLayer);
        };
        // public prototypal variables
        Object.defineProperties(TextLabelComponent.prototype, {
            'displayOptions': {
                get: function (TextDisplaySettings) {
                    return this.__options;
                },
                set: function (TextDisplaySettings) {
                    this.__options = TextDisplaySettings;
                }
            }
        });
        // public methods
        TextLabelComponent.prototype.draw = function (ctx) {
            var pose = this.__entity.getComponent(PoseComponent);
            var options = this.__options;
            ctx.save();
            ctx.font = options.fontSize + "px " + options.font;
            ctx.fillStyle = options.fillStyle;
            ctx.textAlign = options.textAlign;
            ctx.fillText(options.text, pose.position.x, pose.position.y);
            ctx.restore();
        };

        return TextLabelComponent;
    });