import '../vendor/normalize.css'
import '../pages/index.css'
import { Api } from './utils/apiAuth'

const formSignIn = document.querySelector('.signIn__form')
const signInLogin = document.querySelector('.signIn__input_type_login')
const signInPassword = document.querySelector('.signIn__input_type_password')
const signInCheckbox = document.querySelector('.signIn__checkbox')

const signOutBtn = document.querySelector('.header__link-out')
const signCheck = document.querySelector('.header__link-check')

const formRegistration = document.querySelector('.register__form')
const regLogin = document.querySelector('.register__input_type_login')
const regLabelLogin = document.getElementById('regLabelLogin') 
const regPassword = document.querySelector('.register__input_type_password')

const dropbtn = document.querySelector('.register__dropbtn')
const dropdownContent = document.querySelector('.register__dropdown-content')
const dropbtnText = document.querySelector('.register__dropbtnText')

const apiIndex = new Api()

//switcher for auth/login
signInCheckbox.addEventListener("change", (evt) => {
    if (evt.target.checked) {
        formRegistration.style.display = "flex";
        formSignIn.style.display = "none";
    } else {
        formSignIn.style.display = "flex";
        formRegistration.style.display = "none";
    }
})

//open/close dropdown menu with interests
dropbtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (dropdownContent.style.display == "none" || dropdownContent.style.display == "") {
        dropdownContent.style.display = "block"
    } else {
        dropdownContent.style.display = "none"
    }   
})

//put to placeholder result of dropdown chouse of interest
dropdownContent.addEventListener('click', (evt) => {
    dropbtnText.textContent = evt.target.textContent
    dropbtnText.style.color = 'black'
    dropdownContent.style.display = "none"
})

//register user
formRegistration.addEventListener('submit', (evt) => {
    evt.preventDefault()
    apiIndex.createUser(regLogin.value, regPassword.value, regLabelLogin)
})

//login user
formSignIn.addEventListener('submit', (evt) => {
    evt.preventDefault()
    apiIndex.signIn(signInLogin.value, signInPassword.value)
})

//sign out
signOutBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    apiIndex.signOut()
})

signCheck.addEventListener('click', (evt) => {
    evt.preventDefault()
    apiIndex.checksignIn()
})















// formRegistration.addEventListener('submit', (evt) => {
//     evt.preventDefault()
//     if (valid.checkTwoPasswods(regPassword, regPasswordCheck)) {
//         regLabelPass.textContent = ""
//         regLabelPassConfirm.textContent = ""
//         formSignIn.style.display = "flex";
//         formRegistration.style.display = "none";
//         signInCheckbox.checked = false;
//         api.register(regLogin, regPassword)
//         signIn__title.textContent = "Registration success! Please, sign in:"
//     } else {
//         regLabelPass.textContent = "*Different Passwords"
//         regLabelPassConfirm.textContent = "*Different Passwords"
//     }
// })



// formSignIn.addEventListener('submit', (evt) => {
//     evt.preventDefault()
//     api.signIn()
//     return fetch('https://sohellotest-default-rtdb.firebaseio.com/users.json')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//         console.log(signInLogin.value);
//         let userAcc = userSearch(data, signInLogin.value)
//         localStorage.setItem('userAcc', JSON.stringify(userAcc))
//         window.open('../personalAccount.html', '_self')
//         })

// })


