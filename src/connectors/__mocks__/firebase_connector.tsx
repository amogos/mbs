/* eslint-disable @typescript-eslint/no-unused-vars */
import DatabaseConnector from '../database_connector';
import * as DataTypes from '../../types';
import { booksArray } from './../../connectors/database_caches';

export default class FirebaseConnector implements DatabaseConnector {
    public constructor() {
        this.init();
    }

    private init() {
        var bookValue = {
            author: 'Susanne Schotz',
            state: 'state.book.idle',
            pending: [],
            image: 'https://images-eu.ssl-images-amazon.com/images/I/51UkIlAOwEL._SY90_.jpg',
            language: 'English',
            owner: {
                email: 'florin.mogos@gmail.com',
                name: 'Florin Mogos',
            },
            title: 'The Secret Language of Cats: How to Understand Your Cat for a Better, Happier Relationship',
        } as DataTypes.BookValueType;

        booksArray.push({ id: '-Lb2_zfQlKBdih9FsKQd', value: bookValue });
    }

    public querryBooks(_onComplete?: (resultCode: number) => void): DataTypes.BookRecordType[] {
        return booksArray;
    }

    public assignBook(_index: number, _user: DataTypes.UserType, _onComplete?: (resultCode: number) => void): void {}

    public deleteBook(_bookKey: string, _onComplete?: (resultCode: number) => void): void {}

    public addBook(_data: DataTypes.BookValueType, _onComplete?: (resultCode: number) => void): void {}
}
