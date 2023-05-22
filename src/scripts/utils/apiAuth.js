import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, updatePassword} from "firebase/auth";
import { getDatabase, ref, child, get, push, update, remove} from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app)

const auth = getAuth();

export class Api {
    constructor() {
    }

    checkSignIn() {  
      return auth.currentUser;
    }

    signIn(login, password, errField) {  
        errField.textContent = '' 
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            // Signed in 
            window.open('../personalAccount.html', '_self')
        })
        .catch((error) => {
            errField.textContent = error.message
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

    changeProfileData({name= '', email ='', interest= '', threeFacts ='', key='', ready = '', imgSrc=''} ={}) {   
      const postData = {
        name: name,
        email: email,
        id: key,
        interest: interest,
        imgSrc: imgSrc,
        threeFacts: threeFacts,
        ready: ready
      };
      
      let postKey = key
      if (!postKey) {
        postKey = push(child(ref(database), 'posts')).key;
      }

      const updates = {};

      for (let key in postData) {
        if (postData[key] !== '') {

          updates['users/'+ `${postKey}/`+ `${key}/` ] = postData[key];
        }
      }
    
      return update(ref(database), updates);
    }

    createUser(login, password, errField, name, interest, threeFacts, changeProfileDataFunc) {
      errField.textContent = ''
      createUserWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return changeProfileDataFunc({name: name, email: login, interest: interest, threeFacts: threeFacts, key:user.uid, ready: true, imgSrc: "null"})
      })
      .then(() => {
        window.open('../personalAccount.html', '_self')
      })
      .catch((error) => {
      errField.textContent = error.message
      });
  }

    sendFileToStorage(file) {
      const folderRef = `images/avatar${auth.currentUser.uid}`
      const storageRef = refStor(storage, folderRef);
      return uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(storageRef);
      })
      .then(url => url)
    }

    deleteUserFc(deleteDataFc) {
      deleteDataFc()
      .then(() =>{
        return deleteUser(auth.currentUser)
      })
      .then(() => {
        // User deleted.
        window.open('../index.html', '_self')
      })
      .catch((error) => {
        // An error ocurred
      });
    }

    deleteProfileData() {
      var dadaRef = ref(database, `users/${auth.currentUser.uid}`)
      return remove(dadaRef)
    }

    updateUserPassword(user, password, newPassword, errField) {
      console.log('Click')
      errField.textContent = ''
      signInWithEmailAndPassword(auth, user, password)
      .then(()=> {
        console.log('Signed in')
        return updatePassword(auth.currentUser, newPassword)
      })
      .then(() => {
        console.log('Password updated')
        return signOut(auth)
      })
      .then(() => {
        console.log('Signed out')
        errField.textContent = "Update successful"
      }).catch((error) => {
        errField.textContent = error.message
      });
    }
}

