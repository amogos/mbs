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
        });
    }

    assignBook(data: Types.BookKeyType, user: Types.UserType, onComplete: any) {
        let bookKey = data;
        let newHolder = { holder: { name: user.name, email: user.email } }
        firebase.database().ref().child('books').child(bookKey.id as string).update(newHolder, () => onComplete(bookKey, newHolder));
    }

    deleteBook(data: Types.BookKeyType, onComplete: any) {
        let bookKey = data;
        firebase.database().ref().child('books').child(bookKey.id as string).remove(() => onComplete(bookKey));
    }

    addBook(data: Types.BookValueType, user: Types.UserType, onComplete: any) {
        let newEntry = {
            author: data.author,
            holder: { name: "", email: "" },
            image: data.image,
            language: data.language,
            owner: {
                name: user.name,
                email: user.email
            },
            title: data.title
        };
        var ref = firebase.database().ref().child('books').push();
        var key = ref.key;
        ref.set(newEntry, () => onComplete(newEntry, key));
    }
}