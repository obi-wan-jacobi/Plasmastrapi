define(['handle', 'sprite-frame-handle'],
function (Handle, SpriteFrameHandle) {

    SpriteHandle.prototype = Object.create(Handle.prototype);
    SpriteHandle.prototype.constructor = SpriteHandle;
    function SpriteHandle(spriteFrameHandles) {
        Handle.call(this, spriteFrameHandles, null, SpriteFrameHandle, null);
        this.__currentFrameIndex = 0;
    };
    SpriteHandle.prototype.setFrame = function (frameNumber) {
        if (frameNumber < 0) {
            this.__currentFrameIndex = this.__target.length - 1;
        } else if (frameNumber < this.__target.length) {
            this.__currentFrameIndex = frameNumber;
        } else if (frameNumber >= this.__target.length) {
            this.__currentFrameIndex = 0;
        }
    };
    SpriteHandle.prototype.nextFrame = function () {
        this.setFrame(this.__currentFrameIndex + 1);
    };
    SpriteHandle.prototype.previousFrame = function () {
        this.setFrame(this.__currentFrameIndex - 1);
    };
    SpriteHandle.prototype.draw = function (ctx, position, orientation) {
        this.__target[this.__currentFrameIndex].draw(ctx, position, orientation);
    };

    return SpriteHandle;
});