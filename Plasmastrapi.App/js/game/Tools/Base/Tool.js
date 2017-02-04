define(["../../../engine/Objects/InputHandle"], function (InputHandle) {

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
    Tool.prototype.filterByTraits = function (traitList) {
        this.__engine.toolController.filterByTraits(traitList);
    };
    Tool.prototype.filterByCompatibility = function (compatibilityList) {
        this.__engine.toolController.filterByCompatibility(compatibilityList);
    };
    Tool.prototype.filterByTraitsAndCompatibility = function (traitList, compatibilityList) {
        this.__engine.toolController.filterByTraitsAndCompatibility(traitList, compatibilityList);
    };

    return Tool;
});