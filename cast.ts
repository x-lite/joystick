interface Character {
    tick(tickInfo: TickInfo): void;
    isActive(): boolean;
    getX(): number;
    getY(): number;
}

class Pacman implements Character {

    _xPosition: number;
    _yPosition: number;
    _isYfixed: boolean;
    _yFixed: number;
    _waitSoFar: number;

    constructor() {
        this._xPosition = 0;
        this._yPosition = 0;
        this._isYfixed = false;
        this._waitSoFar = 0;
    }
    tick(info: TickInfo) {
        trace('Pacman tick')
        this.clear();
        this._waitSoFar += info._delta
        trace('Pacman waited: ' + this._waitSoFar)
        if (this._waitSoFar > 100) {
            this.move(info);
            this._waitSoFar = 0;
        }
        this.draw();
    }
    clear() {
        led.unplot(this._xPosition, this._yPosition)
    }
    draw() {
        led.plot(this._xPosition, this._yPosition)
    }
    move(info: TickInfo) {
        trace('Pacman move')
        if(!this._isYfixed) {
            trace('Pacman y considered')
            if (info._joystickData.isDown() && this._yPosition < 4) this._yPosition++;
            if (info._joystickData.isUp() && this._yPosition > 0) this._yPosition--;
        }
        if (info._joystickData.isLeft() && this._xPosition > 0) this._xPosition--;
        if (info._joystickData.isRight() && this._xPosition < 4) this._xPosition++;
        if (info._joystickData.isAPressed() && this._xPosition > 0) this._xPosition--;
        if (info._joystickData.isBPressed() && this._xPosition < 4) this._xPosition++;
    }
    
    isActive() {
        return true;
    }

    getX() {
        return this._xPosition;
    }

    getY() {
        return this._yPosition;
    }

    setFixedY(y: number) {
        this._isYfixed = true;
        this._yFixed = y;
        this._yPosition = y;
    }

}

class Bomb implements Character {

    _xPosition: number;
    _yPosition: number;
    _waitSoFar: number;

    constructor() {
        this._xPosition = 0;
        this._yPosition = 0;
        this._waitSoFar = 0;
    }

    tick(info: TickInfo) {
        trace('Bomb tick')
        this._waitSoFar += info._delta;
        this.clear();
        if(this._waitSoFar > 500) {
            this.move(info);
            this._waitSoFar = 0;
        }
        this.draw();
    }
    
    clear() {
        led.unplot(this._xPosition, this._yPosition)
    }
    
    draw() {
        led.plotBrightness(this._xPosition, this._yPosition, 50)
    }

    move(info: TickInfo) {
        trace('Bomb move')
        this._yPosition++;
        if(this._yPosition > 4) {
            this._yPosition = 0;
            this._xPosition++;
        }
    }

    hit() {
        this._yPosition = utils.getRandomIntInclusive(0,4);
        this._xPosition = utils.getRandomIntInclusive(0,4);
    }

    isActive() {
        return true;
    }

    getX() {
        return this._xPosition;
    }

    getY() {
        return this._yPosition;
    }

}