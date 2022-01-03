interface Character {
    tick(tickInfo: TickInfo): void;
    isActive(): boolean;
    getX(): number;
    getY(): number;
}

class Pacman implements Character {

    _xPosition: number;
    _yPosition: number;

    constructor() {
        this._xPosition = 0;
        this._yPosition = 0;
    }
    tick(info: TickInfo) {
        this.clear();
        this.move(info);
        this.draw();
    }
    clear() {
        led.unplot(this._xPosition, this._yPosition)
    }
    draw() {
        led.plot(this._xPosition, this._yPosition)
    }
    move(info: TickInfo) {
        if (info._joystickData.isLeft() && this._xPosition > 0) this._xPosition--;
        if (info._joystickData.isRight() && this._xPosition < 4) this._xPosition++;
        if (info._joystickData.isDown() && this._yPosition < 4) this._yPosition++;
        if (info._joystickData.isUp() && this._yPosition > 0) this._yPosition--;
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

        this._waitSoFar += info._delta;
        this.clear();
        if(this._waitSoFar > 1000) {
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