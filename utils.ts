namespace utils {

    export function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    export function cls() {
        fls();
        led.toggleAll();
    }

    export function fls() {
        led.plotAll();
    }
}
