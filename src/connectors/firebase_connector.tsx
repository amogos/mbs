import firebase from 'firebase'
import DatabaseConnector from './database_connector'
import * as DataTypes from "../types"
import Store from './../store'
import * as Actions from '../actions/index'

var booksArray: Array<DataTypes.BookRecordType> = [];

class FirebaseConnector implements DatabaseConnector {
    constructor() {
        this.init();
    }

    init() {
        firebase.initializeApp({
            apiKey: "AIzaSyB2MXouZ3ICc9kuyp9FszyA6hVV7SFRX1I",
            authDomain: "mybooksshelve.firebaseapp.com",
            databaseURL: "https://mybooksshelve.firebaseio.com",
            projectId: "mybooksshelve",
            storageBucket: "mybooksshelve.appspot.com",
            messagingSenderId: "627289196388"
        });
    }

    getBooks(): Array<DataTypes.BookRecordType> {
        if (booksArray.length > 0)
            return booksArray;
        firebase.database().ref().child('books').once('value').then(function (snapshot) {
            snapshot.forEach(item => {
                booksArray.push({ id: item.key, value: item.val() });
            })
        }).catch((error) => { alert(error); });
        return booksArray;
    }

    assignBook(index: number, user: DataTypes.UserType): void {
        let key = booksArray[index].id as string;
        firebase.database().ref().child('books').child(key).update({ holder: user }, () => {
            booksArray[index].value.holder = user;
            Store.dispatch(Actions.listBooks());
        }).catch((error) => { alert(error); });
    }

    deleteBook(data: DataTypes.BookKeyType, onComplete: () => void): void {
        firebase.database().ref().child('books').child(data.id as string).remove(() => onComplete()).catch((error) => { alert(error); });
    }

    addBook(data: DataTypes.BookValueType, onComplete: (data: DataTypes.BookValueType, bookKey: string) => void): void {
        var ref = firebase.database().ref().child('books').push();
        var key = ref.key as string;
        ref.set(data, () => onComplete(data, key)).catch((error) => { alert(error); });
    }
}
const dbconnector = new FirebaseConnector();

export default dbconnector;