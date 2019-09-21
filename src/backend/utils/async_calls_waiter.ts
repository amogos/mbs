import Sleep from './sleep';

export default class AsyncCallsWaiter {
    public value1: number = 0;
    public value2: number = 0;
    public begin = () => this.value1++;
    public end = () => this.value2++;

    public result = () => {
        return new Promise(async resolve => {
            while (this.value1 !== this.value2) {
                await Sleep(10);
            }
            this.value1 = this.value2 = 0;
            resolve(true);
        });
    };
}
