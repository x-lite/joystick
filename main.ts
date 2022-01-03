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
function prepareTickData () {
    delta = input.runningTime() - lastTick
    lastTick = input.runningTime()
    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);
    return tickInfo
}

function reset () {
    levelNumber = 1
}

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
