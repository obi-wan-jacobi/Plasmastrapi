define([], function () {

    function SpriteHandle(spriteFrameHandles) {
        this.__spriteFrameHandles = spriteFrameHandles;
        this.__currentFrameIndex = 0;
    };
    SpriteHandle.prototype.draw = function (ctx, position, orientation) {
        this.__spriteFrameHandles[this.__currentFrameIndex].draw(ctx, position, orientation);
    };
    SpriteHandle.prototype.setFrame = function (frameNumber) {
        if (frameNumber < 0) {
            this.__currentFrameIndex = this.__spriteFrameHandles.length - 1;
        } else if (frameNumber < this.__spriteFrameHandles.length) {
            this.__currentFrameIndex = frameNumber;
        } else if (frameNumber >= this.__spriteFrameHandles.length) {
            this.__currentFrameIndex = 0;
        }
    };
    SpriteHandle.prototype.nextFrame = function () {
        this.setFrame(this.__currentFrameIndex + 1);
    };
    SpriteHandle.prototype.previousFrame = function () {
        this.setFrame(this.__currentFrameIndex - 1);
    };

    return SpriteHandle;
});