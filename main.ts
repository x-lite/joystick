
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let lastTick = 0;
let dot = new Dot();
basic.forever(tick);

function tick() {

    basic.pause(50)
    let delta = input.runningTime() - lastTick;
    lastTick = input.runningTime();

    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);
    dot.tick(tickInfo);

}





