class PacmanLevel implements Level {
        
    _pacman: Pacman;
    _isActive: boolean;

    constructor() {
        this._pacman = new Pacman();
        this._isActive = false;
    }
    
    tick(tickInfo: TickInfo) {

        trace('Pacman level tick')
        this._pacman.tick(tickInfo);

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

        info('Pacman complete')
        this._isActive = false;
    }

    start() {
        info('Pacman starting')
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
        info('Pacman eol complete')
    }

    start() {
        info('Pacman eol starting')
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
    _hits = 0;
    
    constructor() {
        this._pacman = new Pacman();
        this._pacman.setFixedY(4);
        this._bomb = new Bomb();
        this._isActive = false;
    }

    tick(tickInfo: TickInfo) {
        this._pacman.tick(tickInfo);
        this._bomb.tick(tickInfo);
        if(this._pacman.getX() == this._bomb.getX() && this._pacman.getY() == this._bomb.getY()) {
            this.hit();
        }
        if(this._hits > 3) {
            this._isActive = false;
            info('BombLevel end')
        }
    }

    hit() {
        for (let i = 0; i < 3; i++) {
            led.plotAll();
            basic.pause(200)
            led.toggleAll()
            basic.pause(200)
        }
        this._hits++;
        this._bomb.hit();
    }

    start() {
        info('BombLevel starting')
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
