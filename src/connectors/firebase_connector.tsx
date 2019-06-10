import firebase from 'firebase';
import DatabaseConnector from './database_connector';
import { booksArray } from './database_caches';
import * as DataTypes from '../types';

export default class FirebaseConnector implements DatabaseConnector {
    public constructor() {
        this.init();
    }

    private init() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB2MXouZ3ICc9kuyp9FszyA6hVV7SFRX1I',
            authDomain: 'mybooksshelve.firebaseapp.com',
            databaseURL: 'https://mybooksshelve.firebaseio.com',
            projectId: 'mybooksshelve',
            storageBucket: 'mybooksshelve.appspot.com',
            messagingSenderId: '627289196388',
        });
    }

    public querryBooks(onComplete?: (resultCode: number) => void): DataTypes.BookRecordType[] {
        booksArray.splice(0, booksArray.length);
        firebase
            .database()
            .ref()
            .child('books')
            .once('value')
            .then(function(snapshot) {
                snapshot.forEach(item => {
                    booksArray.push({ id: item.key, value: item.val() });
                });
                if (onComplete) onComplete(0);
            })
            .catch(error => {
                if (onComplete) onComplete(error);
            });
        return booksArray;
    }

    public assignBook(index: number, user: DataTypes.UserType, onComplete?: (resultCode: number) => void): void {
        let key = booksArray[index].id as string;
        firebase
            .database()
            .ref('books/' + key + '/state/accounts')
            .push(user, () => {
                booksArray[index].value.state.accounts.push(user);
                if (onComplete) onComplete(0);
            })
            .catch(error => {
                if (onComplete) onComplete(error);
            });
    }

    public deleteBook(bookKey: string, onComplete?: (resultCode: number) => void): void {
        firebase
            .database()
            .ref()
            .child('books')
            .child(bookKey)
            .remove(() => {
                booksArray.forEach((item, index) => {
                    if (item.id === bookKey) {
                        booksArray.splice(index, 1);
                    }
                });
                if (onComplete) onComplete(0);
            })
            .catch(error => {
                if (onComplete) onComplete(error);
            });
    }

    public addBook(data: DataTypes.BookValueType, onComplete?: (resultCode: number) => void): void {
        var ref = firebase
            .database()
            .ref()
            .child('books')
            .push();
        var key = ref.key as string;
        ref.set(data, () => {
            booksArray.push({ id: key, value: data });
            if (onComplete) onComplete(0);
        }).catch(error => {
            if (onComplete) onComplete(error);
        });
    }
}
