define(["../Systems/CollisionSystem",
        "../Systems/DrawSystem",
        "../Systems/InputSystem",
        "../Systems/MotionSystem",
        "../Systems/PickSystem"
],
function (
    CollisionSystem,
    DrawSystem,
    InputSystem,
    MotionSystem,
    PickSystem
) {

    return {
        CollisionSystem,
        DrawSystem,
        InputSystem,
        MotionSystem,
        PickSystem
    };
});