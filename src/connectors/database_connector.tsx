export default class DatabaseConnector {
    constructor() {
        if (new.target === DatabaseConnector) {
            throw new TypeError("__abstract_construct_implementation_required__");
        }
    }
    getBooks(onComplete:any) {
        throw new Error('__abstract_not_implemented__');
    }
    assignBook(data:any, user:any, onComplete:any) {
        throw new Error('__abstract_not_implemented__');
    }
    deleteBook(data:any, onComplete:any) {
        throw new Error('__abstract_not_implemented__');
    }
    addBook(data:any, user:any, onComplete:any) {
        throw new Error('__abstract_not_implemented__');
    }

}