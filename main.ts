function tick () {
    if (currentLevel.isActive()) {
        currentLevel.tick(prepareTickData());
    } else {
        levelNumber += 1
        if (levelNumber > levels.length) {
            reset()
        }
        currentLevel = levels.get(levelNumber-1);
        currentLevel.start();
    }
}

function trace(message: string) {
    if (debug) serial.writeLine(message)
}
function info(message: string) {
    serial.writeLine(message)
}

function prepareTickData () {
    delta = input.runningTime() - lastTick
    lastTick = input.runningTime()
    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);
    tickInfo.log();
    return tickInfo
}

function reset () {
    levelNumber = 1
}

let debug = true
let lastTick = 0
let currentLevel: Level = null
let levelNumber = 0
let delta = 0
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let levels = [
    new PacmanLevel(),
    new PacmanEndOfLevel(),
    new BombLevel(),
    new PacmanEndOfLevel()
]
levelNumber = 1
currentLevel = levels.get(levelNumber-1);
currentLevel.start();
forever(tick);
