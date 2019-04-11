import * as Types from "../types"

export default class DatabaseConnector {
    constructor() {
        if (new.target === DatabaseConnector) {
            throw new TypeError("__abstract_construct_implementation_required__");
        }
    }
    getBooks(onComplete: any) {
        throw new Error('__abstract_not_implemented__');
    }
    assignBook(data: Types.BookKeyType, user: Types.UserType, onComplete: any) {
        throw new Error('__abstract_not_implemented__');
    }
    deleteBook(data: Types.BookKeyType, onComplete: any) {
        throw new Error('__abstract_not_implemented__');
    }
    addBook(data: Types.BookValueType, onComplete: any) {
        throw new Error('__abstract_not_implemented__');
    }

}