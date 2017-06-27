define(
function () {

    var imageUrls = [
        'Cutter_closed.png',
        'Cutter_open.png',
        'Trashcan.png',
        'Terminal_out.png',
        'Terminal_in.png',
        'Terminal_hovered.png',
        'AndGate.png',
        'NandGate.png',
        'OrGate.png',
        'XorGate.png',
        'PowerSource.png',
        'PushSwitch_open.png',
        'PushSwitch_closed.png',
        'HoverSwitch.png',
        'LightBulb_open.png',
        'LightBulb_closed.png',
        'LightScreen_open.png',
        'LightScreen_closed.png'
    ];

    for (var imageUrl in imageUrls) {
        imageUrl = 'img/' + imageUrl;
    }

    return imageUrls;
});