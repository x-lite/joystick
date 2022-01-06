function tick () {
    if (__debug) pause(500);
    if (__currentLevel.isActive()) {
        __currentLevel.tick(prepareTickData());
    } else {
        __levelNumber += 1
        if (__levelNumber > levels.length) {
            reset()
        }
        __currentLevel = levels.get(__levelNumber-1);
        __currentLevel.start();
    }
}

function trace(message: string) {
    if (__debug) serial.writeLine(message)
}
function info(message: string) {
    if(!__silent)serial.writeLine(message)
}

function prepareTickData () {
    __delta = input.runningTime() - __lastTick
    __lastTick = input.runningTime()
    let data = joystick.getData();
    let tickInfo = new TickInfo(__delta, data);
    tickInfo.log();
    return tickInfo
}

function reset () {
    __levelNumber = 1
}

let __debug = true
let __silent = false
let __lastTick = 0
let __currentLevel: Level = null
let __levelNumber = 0
let __delta = 0
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let levels = [
    new PacmanLevel(),
    new PacmanEndOfLevel(),
    new BombLevel(),
    new PacmanEndOfLevel()
]
__levelNumber = 1
__currentLevel = levels.get(__levelNumber-1);
__currentLevel.start();
forever(tick);
