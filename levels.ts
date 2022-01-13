class ScoreBoard {
    show(score: number) {
        utils.cls();
        for (let x = 0; x < score; x++) {
            led.plot(x, 0)
            led.plot(x, 1)
            led.plot(x, 2)
            led.plot(x, 3)
            led.plot(x, 4)
            pause(1000)
        }
    }
}

class PacmanLevel implements Level {
        
    _pacman: Character;
    _isActive: boolean;
    _totalTime: number; //for tracking how long it took to complete the level - the longer it takes the lower the score
    
    constructor() {
        this.reset();
    }
    
    tick(tickInfo: TickInfo) {

        trace('Pacman level tick')
        this._pacman.tick(tickInfo);
        this._totalTime+=tickInfo._delta;
        let litCount = 0;
        if(this._totalTime < 15000) {
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    if (led.point(x, y)) {
                        litCount++;
                        if (litCount > 1) {
                            return;
                        }
                    }
                }
            }
        }

        info('Pacman complete')
        this._isActive = false;
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
        led.plotAll();
    }
    isActive() {
        return this._isActive;
    }
    getScore() {
        return 5 - Math.floor(this._totalTime/5000)
    }
}

class BombLevel implements Level {

    _pacman: Character;
    _bombs: Character[];
    _isActive: boolean;
    _hits = 0;
    _tickInfo: TickInfo;
    _totalTime: number; //for tracking how long it took to complete the level - the longer it takes the lower the score

    constructor() {
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

        if (this._hits > 30 || this._totalTime > 15000)  {
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
        this._bombs.push(new Bomb().withSpeed(5))
        this._bombs.push(new Bomb().withSpeed(5))
        this._bombs.push(new Bomb().withSpeed(10))
        this._bombs.push(new Bomb().withSpeed(2))
        this._isActive = false;
        this._totalTime = 0;
    }

    hit() {
        this._hits++;
    }

    start() {
        info('BombLevel starting')
        this._isActive = true;
        led.plotAll();
        led.toggleAll();
        this._totalTime = 0;
    }
    isActive() {
        return this._isActive;
    }
    getScore() {
        return 5 - Math.floor(this._totalTime / 3000)
    }
}

class EndOfLevel implements Level {

    _isActive: boolean;

    constructor() {
        this.reset();
    }

    tick(tickInfo: TickInfo) {
        let ghost = images.iconImage(IconNames.Ghost);
        ghost.showImage(0);
        basic.pause(2000);
        this._isActive = false;
        info('Pacman eol complete')
    }

    start() {
        info('Pacman eol starting')
        this._isActive = true;
    }
    isActive() {
        return this._isActive;
    }
    reset() {
        this._isActive = false;
    }

    getScore() {
        return 0;
    }
}

interface Level {
    tick(tickInfo: TickInfo): void;
    start():void;
    isActive(): boolean;
    reset():void;
    getScore(): number;
}
