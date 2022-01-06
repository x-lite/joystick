interface Character {
    tick(tickInfo: TickInfo): void;
    isActive(): boolean;
    getX(): number;
    getY(): number;
    hit(): void;
    withSpeed(speed: number): Character;
    withFixedYPosition(yPosition: number): Character;
    withFixedXPosition(xPosition: number): Character;
    withXposition(xPosition: number): Character;
    withYposition(yPosition: number): Character;
}

class AbstractCharacter implements Character {

    _xPosition: number;
    _yPosition: number;
    _isYfixed: boolean;
    _isXfixed:boolean;
    _speed: number;
    _frameDelay: number;
    _waitSoFar: number;
    _name: String;

    constructor(name: String) {
        this._xPosition = 0;
        this._yPosition = 0;
        this._isYfixed = false;
        this._waitSoFar = 0;
        this._name = name;
    }

    tick(info: TickInfo) {
        trace(this._name + ' tick')
        this.clear();
        this._waitSoFar += info._delta
        trace(this._name + ' waited: ' + this._waitSoFar)
        if (this._waitSoFar >= this._frameDelay) {
            this.move(info);
            this._waitSoFar = 0;
        }
        this.draw();
    }

    move(info: TickInfo) {
        //no-op, override this for the behaviour you want
    }

    clear() {
        led.unplot(this._xPosition, this._yPosition)
    }

    draw() {
        led.plot(this._xPosition, this._yPosition)
    }
    
    withSpeed(speed: number) {
        this._speed = speed;
        this._frameDelay = 1000/speed;
        return this;
    }

    withFixedYPosition(yPosition: number) {
        this._isYfixed=true;
        this._yPosition = yPosition;
        return this;
    }

    withFixedXPosition(xPosition: number) {
        this._isXfixed = true;
        this._xPosition = xPosition;
        return this;
    }

    withXposition(xPosition: number) {
        this._xPosition = xPosition;
        return this;
    }
    
    withYposition(yPosition: number) {
        this._yPosition = yPosition;
        return this;
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

    hit() {
        //no-op - override to get the desired hit behaviour
    }

}

class Pacman extends AbstractCharacter {

    constructor() {
        super('Pacman');
    }

    //Override the move
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
    
}

class Bomb extends AbstractCharacter {

    constructor() {
        super('Bomb')
    }
  
    //Override so can set brightness
    draw() {
        led.plotBrightness(this._xPosition, this._yPosition, 50)
    }

    //Override move 
    move(info: TickInfo) {
        trace('Bomb move')
        this._yPosition++;
        if(this._yPosition > 4) {
            this._yPosition = 0;
            this._xPosition++;
            if(this._xPosition > 4) {
                this._xPosition = 0;
            }
        }
    }

    hit() {
        //move to a new, random position
        this._yPosition = 0; //utils.getRandomIntInclusive(0,4);
        this._xPosition = utils.getRandomIntInclusive(0,4);
    }

}