export default class QueryCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.data = [];
    }

    addEntry(key, value) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i].key === key) {
                this.data[i].value = value;
                return;
            }
        }
        if (this.size < this.capacity - 1) {
            this.data.push({ key: key, value: value });
            this.size++;
        } else {
            this.data[0] = { key: key, value: value };
        }
    }

    getEntry(key) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i].key === key) {
                return this.data[i];
            }
        }
        return null;
    }
}
