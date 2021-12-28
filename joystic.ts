class Joystick {

    _a: boolean;
    _b: boolean;

    _xThreshold: number;
    _yThreshold: number;

    _xPin: AnalogPin;
    _yPin: AnalogPin;

    constructor(xPin: AnalogPin, yPin: AnalogPin, xThreshold: number, yThreshold: number) {

        this._xPin = xPin;
        this._yPin = yPin;
        this._xThreshold = xThreshold;
        this._yThreshold = yThreshold;

        input.onButtonPressed(Button.A, function () {
            this._a = true;
        })
        input.onButtonPressed(Button.B, function () {
            this._b = true;
        })
    }

    getData(): JoystickData {
        let x = pins.analogReadPin(this._xPin);
        let y = pins.analogReadPin(this._yPin);
        serial.writeLine("x:" + x);
        serial.writeLine("y:" + y);
        let left =  x < (512 - this._xThreshold);
        let right = x > (512 + this._xThreshold);
        let up = y > (512 + this._yThreshold);
        let down = y < (512 - this._yThreshold);
        let data = new JoystickData(left, right, up, down, this._a, this._b);
        this._a = false;
        this._b = false;
        return data;
    }
}

class JoystickData {

    _left: boolean;
    _right: boolean;
    _up: boolean;
    _down: boolean;
    _a: boolean;
    _b: boolean;

    constructor(left: boolean, right: boolean, up: boolean, down: boolean, a: boolean, b: boolean) {
        this._left = left;
        this._right = right;
        this._up = up;
        this._down = down;
        this._a = a;
        this._b = b;
    }

    isLeft(): boolean {
        return this._left;
    }
    isRight(): boolean {
        return this._right;
    }
    isUp(): boolean {
        return this._up;
    }
    isDown(): boolean {
        return this._down;
    }
    isAPressed(): boolean {
        return this._a;
    }
    isBPressed(): boolean {
        return this._b;
    }

    toString(): string {
        return "";
    }
}

class Dot {

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
}
