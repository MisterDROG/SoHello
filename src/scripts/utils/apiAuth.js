import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app)

const auth = getAuth();

export class Api {
    constructor() {
    }

    checksignIn() {  
      return auth.currentUser;
    }

    signIn(login, password) {   
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('sign-in done')
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

    changeProfileData({name= '', interest= '', threeFacts ='', key='', ready = '', imgSrc=''} ={}) {   

      const postData = {
        name: name,
        interest: interest,
        imgSrc: imgSrc,
        threeFacts: threeFacts,
        ready: ready
      };
      
      let postKey = key
      if (!postKey) {
        postKey = push(child(ref(database), 'posts')).key;
      }

      postKey = '8'

      const updates = {};

      for (let key in postData) {
        if (postData[key] !== '') {
          updates['users/'+ `${postKey}/`+ `${key}/` ] = postData[key];
        }
      }
    
      return update(ref(database), updates);
    }

}

