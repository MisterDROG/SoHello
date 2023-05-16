import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { getDatabase, ref, child, get  } from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const auth = getAuth();

export class Api {
    constructor() {
    }

    checksignIn(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log('signedIn')
            } else {
                console.log('signedOut')
            }
          });
    }

    signIn(login, password) {   

        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('sign-in done')
            // localStorage.setItem('userData', JSON.stringify(res))
            window.open('../personalAccount.html', '_self')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    } 

    signOut() {   
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('sign-out done')
            window.open('../index.html', '_self')
          }).catch((error) => {
            // An error happened.
          });
    } 

    createUser(login, password, errField) {
        errField.textContent = ''
        createUserWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errField.textContent = errorMessage
        });
    }

    getUsersFromDB() {
        const allUsersRef = ref(database);
        return get(child(allUsersRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
              return snapshot.val()
            } else {
              return "No data available"
            }
          }).catch((error) => {
            console.error(error);
          });
    }

}

