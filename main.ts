
let joystick = new Joystick(AnalogPin.P5, AnalogPin.P6, 200, 200)
basic.forever(tick);

function tick() {

    let data = joystick.getData();

}



