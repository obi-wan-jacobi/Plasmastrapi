define(['pick-component'],
function (PickComponent) {

    function CompatibilityAttribute() {
        
    };
    CompatibilityAttribute.prototype.decorate = function (pickComponent) {
        if (!(pickComponent instanceof PickComponent)) {
            validator.throw(this, 'decorate', `${this.name} may only be applied to arguments of type ${PickComponent.name}`);
        }
        Object.defineProperties(pickComponent, {
            [`is${this.name}`]: {
                get: function () {
                    return true;
                }
            }
        });
    };
    CompatibilityAttribute.prototype.evaluate = function (pickComponent) {
        if (!(pickComponent instanceof PickComponent)) {
            validator.throw(this, 'evaluate', `${this.prototype.name} may only be applied to arguments of type ${PickComponent.name}`);
        }
        return pickComponent[`is${this.name}`]
    };

    return CompatibilityAttribute;
});