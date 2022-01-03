
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let lastTick = 0;
let level1 = new Level1();
let level2 = new Level2();
let level1Complete = false;

basic.forever(tick);
level1.start();

function tick() {
    
    let delta = input.runningTime() - lastTick;
    lastTick = input.runningTime();

    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);

    if(level1.isActive()) {
        level1.tick(tickInfo);
    } else {
        if(level1Complete) {
            level2.tick(tickInfo)
        } else {
            level1Complete = true;
            let ghost = images.iconImage(IconNames.Ghost);
            ghost.showImage(0);
            basic.pause(2000);
            level2.start();
        }
    }
    
}







