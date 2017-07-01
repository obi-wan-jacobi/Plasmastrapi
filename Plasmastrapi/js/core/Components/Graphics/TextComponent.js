﻿define(['component', 'position', 'pose-component'],
function (Component, Position, PoseComponent) {

        // CLASS TextComponent
        TextComponent.prototype = Object.create(Component.prototype);
        TextComponent.prototype.constructor = TextComponent;
        function TextComponent(textHandle) {
            // inherits from
            Component.call(this, textHandle);
        };

        return TextComponent;
    });