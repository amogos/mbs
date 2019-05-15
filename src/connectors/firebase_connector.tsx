import firebase from 'firebase'
import DatabaseConnector from './database_connector'
import * as DataTypes from "../types"


export var booksArray: Array<DataTypes.BookRecordType> = [];

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

    querryBooks(onComplete?: () => void): Array<DataTypes.BookRecordType> {
        booksArray = [];
        firebase.database().ref().child('books').once('value').then(function (snapshot) {
            snapshot.forEach(item => {
                booksArray.push({ id: item.key, value: item.val() });
            })
            if (onComplete)
                onComplete();
        }).catch((error) => { alert(error); });
        return booksArray;
    }

    assignBook(index: number, user: DataTypes.UserType, onComplete?: () => void): void {
        let key = booksArray[index].id as string;
        firebase.database().ref().child('books').child(key).update({ holder: user }, () => {
            booksArray[index].value.holder = user;
            if (onComplete)
                onComplete();
        }).catch((error) => { alert(error); });
    }

    deleteBook(bookKey: string, onComplete?: () => void): void {
        firebase.database().ref().child('books').child(bookKey).remove(() => {
            booksArray.forEach((item, index) => {
                if (item.id === bookKey) {
                    booksArray.splice(index, 1);
                }
            });
            if (onComplete)
                onComplete();

        }).catch((error) => { alert(error); });
    }

    addBook(data: DataTypes.BookValueType, onComplete?: () => void): void {
        var ref = firebase.database().ref().child('books').push();
        var key = ref.key as string;
        ref.set(data, () => {
            booksArray.push({ id: key, value: data });
            if (onComplete)
                onComplete();
        }).catch((error) => { alert(error); });
    }
}
const dbconnector = new FirebaseConnector();
export default dbconnector;
