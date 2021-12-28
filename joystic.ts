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
        let left = pins.analogReadPin(this._xPin) < 512 - this._xThreshold;
        let right = pins.analogReadPin(this._xPin) > 512 + this._xThreshold;
        let up = pins.analogReadPin(this._yPin) > 512 + this._yThreshold;
        let down = pins.analogReadPin(this._yPin) < 512 - this._yThreshold;
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

}

