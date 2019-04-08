import firebase from 'firebase'
import DatabaseConnector from './database_connector'

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

    getBooks(onComplete) {
        var booksArray = [];
        firebase.database().ref().child('books').once('value').then(function (snapshot) {
            snapshot.forEach(item => {
                booksArray.push({ id: item.key, value: item.val() });
            })
            onComplete(booksArray);
        });
    }

    assignBook(data, user, onComplete) {
        let bookKey = data.param;
        let newHolder = { holder: { name: user.name, email: user.email } }
        firebase.database().ref().child('books').child(bookKey).update(newHolder, () => onComplete(bookKey, newHolder));
    }

    deleteBook(data, onComplete) {
        let bookKey = data.param;
        firebase.database().ref().child('books').child(bookKey).remove(() => onComplete(bookKey));
    }

    addBook(data, user, onComplete) {
        let newEntry = {
            author: data.param.author,
            holder: { name: "", email: "" },
            image: data.param.image,
            language: data.param.language,
            owner: {
                name: user.name,
                email: user.email
            },
            title: data.param.title
        };
        var ref = firebase.database().ref().child('books').push();
        var key = ref.key;
        ref.set(newEntry, () => onComplete(newEntry, key));
    }
}