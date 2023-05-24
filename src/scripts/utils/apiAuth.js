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

    //function for checking authentication status
    checkSignIn() {  
      return auth.currentUser;
    }

    //function for user sign in
    signIn(login, password, errField) {  
        errField.textContent = '' 
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            //Signed in 
            window.open('../personalAccount.html', '_self')
        })
        .catch((error) => {
            errField.textContent = error.message
        });

    } 

    //function for user sign out
    signOut(errField) {   
      errField.textContent = ''
      signOut(auth).then(() => {
          //Sign-out successful.
          window.open('../index.html', '_self')
        }).
        catch((error) => {
          errField.textContent = error.message
        });
    } 

    //function for getting all users from database
    getUsersFromDB(errField) {
      errField.textContent = ''
      const allUsersRef = ref(database);
      return get(child(allUsersRef, `users/`)).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val()
          } else {
            return "No data available"
          }
        }).catch((error) => {
          errField.textContent = 'You are not logged into your account. This is an example of how the personal account page looks like. Account buttons are disabled. Please, go to Home page and Sign In or Register.'
        });
    }

    //function for changing data of user in the users storage
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

    //function for creating user
    createUser(login, password, errField, name, interest, threeFacts) {
      errField.textContent = ''
      createUserWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        //Signed in 
        const user = userCredential.user;
        return this.changeProfileData({name: name, email: login, interest: interest, threeFacts: threeFacts, key:user.uid, ready: true, imgSrc: "null"})
      })
      .then(() => {
        window.open('../personalAccount.html', '_self')
      })
      .catch((error) => {
      errField.textContent = error.message
      });
  }

    //function tp push image to the data base and return url of it
    sendFileToStorage(file, errField) {
      errField.textContent = ''
      const folderRef = `images/avatar${auth.currentUser.uid}`
      const storageRef = refStor(storage, folderRef);
      return uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(storageRef);
      })
      .then(url => url)
      .catch((error) => {
        errField.textContent = error.message
      });
    }

    //function for delete user from authentication database
    deleteUser(errField) {
      errField.textContent = ''
      this.deleteProfileData()
      .then(() =>{
        return deleteUser(auth.currentUser)
      })
      .then(() => {
        //User deleted.
        window.open('../index.html', '_self')
      })
      .catch((error) => {
        errField.textContent = error.message
      });
    }

    //function for delete data of user from users database
    deleteProfileData() {
      var dadaRef = ref(database, `users/${auth.currentUser.uid}`)
      return remove(dadaRef)
    }

    //function for changing password
    updateUserPassword(user, password, newPassword, errField) {
      errField.textContent = ''
      signInWithEmailAndPassword(auth, user, password)
      .then(()=> {
        return updatePassword(auth.currentUser, newPassword)
      })
      .then(() => {
        return signOut(auth)
      })
      .then(() => {
        errField.textContent = "Update successful"
      }).catch((error) => {
        errField.textContent = error.message
      });
    }
}

