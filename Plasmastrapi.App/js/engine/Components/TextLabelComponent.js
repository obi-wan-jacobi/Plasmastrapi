define(["../Objects/Component", "../Data/Geometry", "./PoseComponent"],
    function (Component, Geometry, PoseComponent) {

        // CLASS TextLabelComponent
        TextLabelComponent.prototype = Object.create(Component.prototype);
        TextLabelComponent.prototype.constructor = TextLabelComponent;
        function TextLabelComponent(textLabelDisplayOptions) {
            // inherits from
            Component.call(this);
            // private variables
            this.__options = textLabelDisplayOptions;
            Component.Mixins.Drawable.call(this, this.__options.displayLayer);
        };
        // public prototypal variables
        Object.defineProperties(TextLabelComponent.prototype, {
            'displayOptions': {
                get: function (textLabelDisplayOptions) {
                    return this.__options;
                },
                set: function (textLabelDisplayOptions) {
                    this.__options = textLabelDisplayOptions;
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