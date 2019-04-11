import firebase from 'firebase'
import DatabaseConnector from './database_connector'
import * as Types from "../types"

export default class FirebaseConnector extends DatabaseConnector {
    constructor() {
        super();
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

    getBooks(onComplete: any) {
        var booksArray: Array<Types.BookRecordType> = [];
        firebase.database().ref().child('books').once('value').then(function (snapshot) {
            snapshot.forEach(item => {
                booksArray.push({ id: item.key, value: item.val() });
            })
            onComplete(booksArray);
        }).catch((error) => { alert(error); });
    }

    assignBook(data: Types.BookKeyType, user: Types.UserType, onComplete: any) {
        let bookKey = data.id;
        let newHolder = { holder: { name: user.name, email: user.email } }
        firebase.database().ref().child('books').child(bookKey as string).update(newHolder, () => onComplete(bookKey, newHolder)).catch((error) => { alert(error); });
    }

    deleteBook(data: Types.BookKeyType, onComplete: any) {
        let bookKey = data.id;
        firebase.database().ref().child('books').child(bookKey as string).remove(() => onComplete(bookKey)).catch((error) => { alert(error); });
    }

    addBook(data: Types.BookValueType, onComplete: any) {
        var ref = firebase.database().ref().child('books').push();
        var key = ref.key;
        ref.set(data, () => onComplete(data, key)).catch((error) => { alert(error); });
    }
}