import app from 'firebase/app';

var config = {
    apiKey: "AIzaSyB2MXouZ3ICc9kuyp9FszyA6hVV7SFRX1I",
    authDomain: "mybooksshelve.firebaseapp.com",
    databaseURL: "https://mybooksshelve.firebaseio.com",
    projectId: "mybooksshelve",
    storageBucket: "mybooksshelve.appspot.com",
    messagingSenderId: "627289196388"
};n

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;