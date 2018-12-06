import {firebaseApp} from '../Signin Components/firebase'

function user() {
//    console.log("What:" + auth.currentUser.email);
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}


export const read = () => {   //assuming already logged in
    var people = {};
    return entry().get().then(function(doc) {
        //console.log(doc.data().length);
        people = doc.data();
//        console.log(people);
        return people;
    });
};

//Write member info to database
export const write = (people) => {
    console.log(people);
    entry().set(people);
};
