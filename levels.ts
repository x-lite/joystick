class PacmanLevel implements Level {
    
    _pacman: Pacman;
    _isActive: boolean;
    
    constructor() {
        this._pacman = new Pacman();
        this._isActive = false;
    }
    
    tick(tickInfo: TickInfo) {

        this._pacman.tick(tickInfo);

        basic.pause(25)

        let litCount = 0;
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

        this._isActive = false;
    }

    start() {
        this._isActive = true;
        led.plotAll();
    }
    isActive() {
        return this._isActive;
    }
}

class PacmanEndOfLevel implements Level {

    _isActive: boolean;

    constructor() {
        this._isActive = false;
    }

    tick(tickInfo: TickInfo) {
        let ghost = images.iconImage(IconNames.Ghost);
        ghost.showImage(0);
        basic.pause(2000);
        this._isActive = false;
    }

    start() {
        this._isActive = true;
    }
    isActive() {
        return this._isActive;
    }
}

class BombLevel implements Level {

    _pacman: Pacman;
    _bomb: Bomb;
    _isActive: boolean;

    constructor() {
        this._pacman = new Pacman();
        this._bomb = new Bomb();
        this._isActive = false;
    }

    tick(tickInfo: TickInfo) {

        this._pacman.tick(tickInfo);
        this._bomb.tick(tickInfo);

        basic.pause(25)

        this._isActive = false;
    }

    start() {
        this._isActive = true;
        led.plotAll();
        led.toggleAll();
    }
    isActive() {
        return this._isActive;
    }
}

interface Level {
    tick(tickInfo: TickInfo): void;
    start():void;
    isActive(): boolean;
}
