
let joystick = new Joystick(AnalogPin.P0, AnalogPin.P2, 200, 200);
let lastTick = 0;
let levels = [new PacmanLevel(), new PacmanEndOfLevel(), new BombLevel(), new PacmanEndOfLevel()]
let currentLevel: Level = null;
let levelNumber = 1;

currentLevel = levels.get(levelNumber-1);
currentLevel.start();


function prepareTickData() {
    let delta = input.runningTime() - lastTick;
    lastTick = input.runningTime();

    let data = joystick.getData();
    let tickInfo = new TickInfo(delta, data);
    return tickInfo;
}

function reset() {
    levelNumber = 1;
}

function tick() {
    
    if (currentLevel.isActive()) {
        currentLevel.tick(prepareTickData());
    } else {
        
        levelNumber++;
        
        if(levelNumber > levels.length) reset();

        currentLevel = levels.get(levelNumber-1);
        currentLevel.start();
    }
    
}







