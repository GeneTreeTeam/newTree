import {auth, firebase} from './firebase'
import {doSignInWithEmailAndPassword} from "./auth";
// Frontend uses JS instead of JSON now
// id:user_email
// |-people
// | |-id:0
// | | |name:user_name
// | | |email:user_email
// | |-id:mother_id
// | | |-name:mother_name
// | |-id:father_id
// | | |-name:father_name
// | |-id:sibling_id
// |   |-sibling_name
// |-relationships
//   |-id:r1_id
//   | |-type:'mother'
//   | |-child:0
//   | |-parent:mother_id
//   |-id:r2_id
//   | |-type:'father'
//   | |-child:0
//   | |-parent:father_id
//   |-id:r1_id
//   | |-type:'mother'
//   | |-child:sibling_id
//   | |-parent:mother_id
//   |-id:r1_id
//     |-type:'father'
//     |-child:sibling_id
//     |-parent:father_id


function user() {
    console.log("What:" + auth.currentUser.email);
    return auth.currentUser;
}
function db() {
    return firebase.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}


export default class Person {
    constructor(id, people, name,email="" ) { //id supplied must be unique
        this.mother = null;
        this.father = null;
        this.children = [];
        this.name = name;
        this.email = email;
        this.id = id;
        this.self = this;
        people[this.id] = this;
    }
    static class(theList, obj) {
        var holder = new Person(theList,obj.name,obj.email,obj.id);
        if (obj.mother != null){
            holder.setAsMother(obj.mother);
        }
        if (obj.father != null){
            holder.setAsFather(obj.mother);
        }
        for (var child in obj.children){
            holder.addChild(child)
        }
        return holder;
    }
    getMother() {
        return this.mother;
    }
    getFather() {
        return this.father;
    }
    getChildren() {
        return this.children;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getID() {
        return this.id;
    }

    //set relationships

    setMother(mother) {
        if (this.mother !== mother) {
            if (this.mother) {
                this.mother.removeChild(this);
            }
            if (mother) {
                mother.addChild(this);
            }
            this.mother = mother;
        }
    }
    setFather(father) {
        if (this.father !== father) {
            if (this.father) {
                this.father.removeChild(this);
            }
            if (father) {
                father.addChild(this);
            }
            this.father = father;
        }
    }
    setAsMother(child) {
        //  console.log("eek");
        this.setMother(child);
    }
    setAsFather(child) {
        this.setFather(child);
    }
    toString()
    {
        return this.getName() + " " + this.getEmail() + " " + this.getID();
    }
    //Remove this Person from all relationships(via children) AND database.
    remove(people) {    //delete person
        console.log(this.name);
        //console.log(this.children.length);
        console.log(this.children[0]);
        for (var child in this.children) {
            console.log("Hello" + child);
            if (child.getMother() === this) {
                child.setMother(null);
            } else if (child.getFather() === this) {
                child.setFather(null);
            }
        }

        this.mother.removeChild(this);
        this.father.removeChild(this);

        if (people) {
            people.remove(this.id);
        }
    }

    //Only creates child does not set relationship (external use complex so avoid)
    addChild(child) {
        for (var c in this.children) {
            if (c === child) {  //checks existing children for duplicacy
                return false;
            }
        }
        this.children.push(child);
        return true;
    }
    removeChild(child) {
        for (var i = 0; i < this.children.length; i ++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return true;
            }
        }
        return false; //child not found
    }
};

export const read = () => {   //assuming already logged in
    var people = {};
    var state = {};
    var returns = entry().get().then(function(doc) {
        //console.log(doc.data().length);
        people = doc.data();
//        console.log(people);
        return people;
    });
    //console.log("its me" + returns);
    return returns;
};


export const whoAmI = () =>
    console.log(firebase.auth().currentUser);

export const logOut = () =>
    firebase.auth().signOut();

// Function to reset password if forgotten
export const pwdReset = (email) =>
    firebase.auth().sendPasswordResetEmail(email);

// Function to change password assuming logged in
export const pwdChange = (password) =>
    user().updatePassword(password);

//Write member info to database
export const write = (people) => {
    console.log(people);
    entry().set(people);
};

//stores type of relationship
const relate = (type, childID, parentID, rels) => {
    console.log("The log" + rels + " " + typeof(rels));
    var key = relationKeyGen(type, childID, parentID);
    console.log(key + " KEY");
    if (!(key in rels)) {
        rels[key] = {type: type, child: childID, parent: parentID};
    }
};

//determines relationship
const relationKeyGen = (type, childID, parentID) => {
    return '{'+ type +'}:{'+childID+'}:{'+parentID+'}';
};