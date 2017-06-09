define(['component'],
function (Component) {

    // CLASS InputComponent
	InputComponent.prototype = Object.create(Component.prototype);
	InputComponent.prototype.constructor = InputComponent;
	function InputComponent(inputHandle) {
	    // inherits from
	    Component.call(this, inputHandle);
    };

    return InputComponent;
});