class ScoreBoard {

    __plotPause: number;
    __introPause: number;

    constructor() {
        if(__debug) {
            this.__plotPause = 250
            this.__introPause = 250
        } else {
            this.__plotPause = 1000
            this.__introPause = 2000
        }
    }

    show(score: number) {
        info('Show score: ' + score)
        utils.cls();
        pause(this.__introPause)
        for (let x = 0; x < score; x++) {
            led.plot(x, 0)
            led.plot(x, 1)
            led.plot(x, 2)
            led.plot(x, 3)
            led.plot(x, 4)
            pause(this.__plotPause)
        }
        pause(this.__introPause)
    }
}

class PacmanLevel implements Level {

    MAX_TIME_ON_LEVEL: number;
    _pacman: Character;
    _isActive: boolean;
    _totalTime: number; //for tracking how long it took to complete the level - the longer it takes the lower the score
    
    constructor() {
        if (__debug) {
            this.MAX_TIME_ON_LEVEL = 2500
        } else {
            this.MAX_TIME_ON_LEVEL = 30000
        }
        this.reset();
    }
    
    tick(tickInfo: TickInfo) {

        trace('Pacman level tick')
        this._pacman.tick(tickInfo);
        this._totalTime+=tickInfo._delta;
        let litCount = 0;
        let screenEmpty = true;
        if (this._totalTime < this.MAX_TIME_ON_LEVEL) {
            screenEmpty = utils.atEveryPoint(function(x: number, y: number):boolean{
                if (led.point(x, y)) {
                    litCount++;
                    if (litCount > 1) {
                        return false;
                    }
                }
                return true;
            })
        }

        info('Pacman complete')
        this._isActive = !screenEmpty;
    }
    
    reset() {
        info('Resetting pacman level')
        this._pacman = new Pacman()
            .withSpeed(5)
            .withXposition(2)
            .withYposition(3)
        this._isActive = false;
        this._totalTime = 0;
    }
    start() {
        info('Pacman starting')
        this._isActive = true;
        this._totalTime = 0;
        led.plotAll()
    }
    isActive() {
        return this._isActive;
    }
    getScore() {
        return 5 - Math.floor(this._totalTime/5000)
    }
}

class BombLevel implements Level {

    MAX_TIME_ON_LEVEL: number;
    TARGET_NUMBER_OF_HITS: number;
    _pacman: Character;
    _bombs: Character[];
    _isActive: boolean;
    _hits = 0;
    _tickInfo: TickInfo;
    _totalTime: number;

    constructor() {
        if(__debug) {
            this.MAX_TIME_ON_LEVEL = 2500
            this.TARGET_NUMBER_OF_HITS = 5
        } else {
            this.MAX_TIME_ON_LEVEL = 30000
            this.TARGET_NUMBER_OF_HITS = 15
        }
        this.reset();
    }

    tick(tickInfo: TickInfo) {
        this._tickInfo = tickInfo;
        this._pacman.tick(tickInfo);
        this._totalTime += tickInfo._delta;

        this._bombs.forEach(
            function (bomb: Character, index: number) {
                bomb.tick(tickInfo);
                if (this._pacman.getX() == bomb.getX() && this._pacman.getY() == bomb.getY()) {
                    bomb.hit();
                    this.hit();
                }
            }
        )

        if (this._hits >= this.TARGET_NUMBER_OF_HITS || this._totalTime > this.MAX_TIME_ON_LEVEL)  {
            this._isActive = false;
            info('BombLevel end')
        }
    }

    reset() {
        info('Resetting bomb level')
        this._pacman = new Pacman()
            .withFixedYPosition(4)
            .withSpeed(5)
            .withXposition(0)
        this._bombs = [];
        this._bombs.push(new Bomb().withSpeed(2))
        this._bombs.push(new Bomb().withSpeed(3))
        this._bombs.push(new Bomb().withSpeed(1))
        this._bombs.push(new Bomb().withSpeed(2))
        this._isActive = false;
        this._hits = 0;
        this._totalTime = 0;
    }

    hit() {
        this._hits++;
    }

    start() {
        info('BombLevel starting')
        this.reset()
        this._isActive = true;
        utils.cls();
    }
    isActive() {
        return this._isActive;
    }
    getScore() {
        return Math.floor(this._hits / 6)  
    }
}

interface Level {
    tick(tickInfo: TickInfo): void;
    start():void;
    isActive(): boolean;
    reset():void;
    getScore(): number;
}
