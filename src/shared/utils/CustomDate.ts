export class CustomDate {
    milliseconds: number;
    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
    }
    toString(): string {
        const currentDate = new Date(this.milliseconds);
        const formattedDate =
            currentDate.getFullYear() +
            '-' +
            (currentDate.getMonth() + 1) +
            '-' +
            currentDate.getDate() +
            ' ' +
            currentDate.getHours() +
            ':' +
            currentDate.getMinutes() +
            ':' +
            currentDate.getSeconds();

        return formattedDate.toString();
    }
}
