function tick () {
    if (__debug) pause(500);

    if (__currentLevel.isActive()) {
        __currentLevel.tick(prepareTickData());
    } else {
        showScore();
        nextLevel();
    }
}

function showScore() {
    //Show scoreboard before moving on
    let score = __currentLevel.getScore()
    __scoreBoard.show(score);
}

function nextLevel() {
    info('NextLevel selection starting')


    info('....current level is ' + __levelNumber)
    __levelNumber = __levelNumber + 1
    info('....next level is ' + __levelNumber)
    if (__levelNumber > levels.length) {
        info('....no such level, resetting ')
        reset()
    }
    info('....current level set to ' + __levelNumber)
    __currentLevel = levels.get(__levelNumber - 1);
    __currentLevel.start();

    info('NextLevel selection complete')
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
    info('Level reset starting')
    __levelNumber = 1
    pacman.reset();
    bombs.reset();
    info('Level reset complete')
}

/** Debug settings */
let __debug = true
let __silent = false
let __joystickActive = false

/** Global vars */
let __lastTick = 0
let __currentLevel: Level = null
let __levelNumber = 0
let __delta = 0
let __scoreBoard = new ScoreBoard();
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let pacman = new PacmanLevel();
let bombs = new BombLevel();

let levels = [
    pacman,
    bombs
]
info('Number of levels registered: ' + levels.length)

__levelNumber = 1
__currentLevel = levels.get(__levelNumber-1);
__currentLevel.start();
forever(tick);
