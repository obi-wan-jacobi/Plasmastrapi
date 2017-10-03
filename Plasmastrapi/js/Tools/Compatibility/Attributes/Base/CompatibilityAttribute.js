define(['tool-compatibility-component'],
function (ToolCompatibilityComponent) {

    function CompatibilityAttribute() {
        
    };
    CompatibilityAttribute.prototype.decorate = function (toolCompatibilityComponent) {
        if (!(toolCompatibilityComponent instanceof ToolCompatibilityComponent)) {
            validator.throw(this, this.prototype.name, this.prototype.name + ' may only be applied to arguments of type ' + ToolCompatibilityComponent.name);
        }
        Object.defineProperties(toolCompatibilityComponent, {
            ['is' + this.prototype.name]: {
                get: function () {
                    return true;
                }
            }
        });
    };

    return CompatibilityAttribute;
});