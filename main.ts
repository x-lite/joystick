
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

    let litCount = 0;
    for(let x=0; x<5; x++) {
        for(let y=0; y<4; y++) {
            if(led.point(x,y)) {
                litCount++;
                if(litCount>1) {
                    return;
                }
            }
        }
    }
    
    led.plotAll();
  
}





