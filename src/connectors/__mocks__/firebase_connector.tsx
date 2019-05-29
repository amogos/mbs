import DatabaseConnector from '../database_connector'
import * as DataTypes from '../../types'
import { booksArray } from './../../connectors/database_caches'

export default class FirebaseConnector implements DatabaseConnector {
    constructor() {
        this.init();
    }

    init() {
        var bookValue = {
            "author": "Susanne Schotz",
            "holder": {
                "email": "",
                "name": ""
            },
            "image": "https://images-eu.ssl-images-amazon.com/images/I/51UkIlAOwEL._SY90_.jpg",
            "language": "English",
            "owner": {
                "email": "florin.mogos@gmail.com",
                "name": "Florin Mogos"
            },
            "title": "The Secret Language of Cats: How to Understand Your Cat for a Better, Happier Relationship"
        } as DataTypes.BookValueType;

        booksArray.push({ id: "-Lb2_zfQlKBdih9FsKQd", value: bookValue });
    }
    
    querryBooks(onComplete?: () => void): Array<DataTypes.BookRecordType> {
        return booksArray;
    }

    assignBook(index: number, user: DataTypes.UserType, onComplete?: () => void): void {
    }

    deleteBook(bookKey: string, onComplete?: () => void): void {
    }

    addBook(data: DataTypes.BookValueType, onComplete?: () => void): void {
    }
}

