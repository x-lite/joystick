
let joystick = new Joystick(AnalogPin.P5, AnalogPin.P6, 200, 200);
let lastTick = 0;
let dot = new Dot();
basic.forever(tick);

function tick() {

    let delta = input.runningTime() - lastTick;
    lastTick = input.runningTime();

    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);
    dot.tick(tickInfo);

}





