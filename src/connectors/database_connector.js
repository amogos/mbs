export default class DatabaseConnector {
    constructor() {
        if (new.target === DatabaseConnector) {
            throw new TypeError("__abstract_construct_implementation_required__");
        }
    }
    getBooks(onComplete) {
        throw new Error('__abstract_not_implemented__');
    }
    assignBook(data, user, onComplete) {
        throw new Error('__abstract_not_implemented__');
    }
    deleteBook(data, onComplete) {
        throw new Error('__abstract_not_implemented__');
    }
    addBook(data, user, onComplete) {
        throw new Error('__abstract_not_implemented__');
    }

}