namespace utils {

    export function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    export function cls() {
        fls(50);
        led.toggleAll();
    }

    export function fls(brightness: number) {
        atEveryPoint(function(x: number, y: number) {
            led.plotBrightness(x, y, brightness)
            return true;
        })
    }

    export function atEveryPoint(dothisUntilIReturnFalse: Function): boolean {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (!dothisUntilIReturnFalse(x,y)) {
                    return false;
                }
            }
        }
        return true;
    }
}
