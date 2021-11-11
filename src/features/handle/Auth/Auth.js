import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";
import {auth} from "../../../firebase"
import { getDatabase, set, ref } from "firebase/database";


export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    
}

export function logout(){
    return signOut(auth)
}

export function resetPassword(email) {
    return sendPasswordResetEmail(auth ,email)
}

export function update_Email(email){
    return updateEmail(auth.currentUser, email)
}

export function update_Password(password){
    return updatePassword(auth.currentUser, password)
}

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return add_user(userCredential)
    }) 
}

function add_user(userCredential){
    const database = getDatabase();
    console.log(userCredential.user);
    // return setDoc(doc(db, "user", userCredential.user.uid), {
    //     email: userCredential.user.email,
    //     rule: "user",
    //     // delete: userCredential.user
    //     }).then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //             console.error("Error writing document: ", error);
    //         });
    return set(ref(database, 'users/' + userCredential.user.uid), {
        email: userCredential.user.email,
        role: "user",
      });
}
