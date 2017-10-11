define(['pick-component'],
function (PickComponent) {

    function CompatibilityAttribute() {
        
    };
    CompatibilityAttribute.prototype.decorate = function (PickComponent) {
        if (!(PickComponent instanceof PickComponent)) {
            validator.throw(this, this.prototype.name, this.prototype.name + ' may only be applied to arguments of type ' + PickComponent.name);
        }
        Object.defineProperties(PickComponent, {
            ['is' + this.prototype.name]: {
                get: function () {
                    return true;
                }
            }
        });
    };

    return CompatibilityAttribute;
});