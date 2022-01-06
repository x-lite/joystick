class Joystick {

    _a: boolean;
    _b: boolean;

    _xThreshold: number;
    _yThreshold: number;

    _xPin: AnalogPin;
    _yPin: AnalogPin;
    _joystickActive: boolean;

    constructor(xPin: AnalogPin, yPin: AnalogPin, xThreshold: number, yThreshold: number) {

        this._xPin = xPin;
        this._yPin = yPin;
        this._xThreshold = xThreshold;
        this._yThreshold = yThreshold;
        this._joystickActive = __joystickActive;

        input.onButtonPressed(Button.A, function () {
            trace('A clicked');
            this._a = true;
        })
        input.onButtonPressed(Button.B, function () {
            trace('B clicked');
            this._b = true;
        })
    }

    getData(): JoystickData {
        let x = pins.analogReadPin(this._xPin);
        let y = pins.analogReadPin(this._yPin);
        let right = this._joystickActive && x < (512 - this._xThreshold);
        let left = this._joystickActive && x > (512 + this._xThreshold);
        let down = this._joystickActive && y > (512 + this._yThreshold);
        let up = this._joystickActive && y < (512 - this._yThreshold);
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
        return 'Left[' + this._left + '], Right[' + this._right + '], Up[' + this._up + '], Down[' + this._down + '], A[' + this._a + '], B[' + this._b +']';
    }
}

