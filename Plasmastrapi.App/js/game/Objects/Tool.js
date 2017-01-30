﻿define(["../../engine/Objects/InputHandle"], function (InputHandle) {

    Tool.prototype = Object.create(InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool() {
        InputHandle.call(this);
        this.registerEvents(
            'onequip',
            'ondiscard'
        );
    };
    Tool.prototype.equip = function (entity) {
        this.load();
        this.__fire('onequip', entity);
    };
    Tool.prototype.discard = function () {
        this.unload();
        this.__fire('ondiscard');
    };
    Tool.prototype.filterByCompatibility = function (Compatibility) {
        this.__engine.toolController.filterByCompatibility(Compatibility);
    };
    Tool.prototype.filterByTraits = function (Trait) {
        this.__engine.toolController.filterByTraits(Trait);
    };

    return Tool;
});