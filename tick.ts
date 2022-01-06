class TickInfo {
    public _delta: number;
    public _joystickData: JoystickData;

    constructor(delta: number, joystickData: JoystickData) {
        this._delta = delta;
        this._joystickData = joystickData;
    }

    log() {
        trace('TickInfo-Delta:' + this._delta)
        trace(this._joystickData.toString());
    }
}
