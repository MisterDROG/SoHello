import '../vendor/normalize.css'
import '../pages/index.css'
import { Api } from './api'

const formSignIn = document.querySelector('.signIn__form')
const signInLogin = document.querySelector('.signIn__input_type_login')
const signInPassword = document.querySelector('.signIn__input_type_password')
const setButton = document.getElementById('button__set')
const signInCheckbox = document.querySelector('.signIn__checkbox')
const signLabelLogin = document.getElementById('signLabelLogin')
const signLabelPass = document.getElementById('signLabelPass')

const formRegistration = document.querySelector('.register__form')
const regLogin = document.querySelector('.register__input_type_login')
const regPassword = document.querySelector('.register__input_type_password')
const regPasswordCheck = document.querySelector('.register__input_type_passwordCheck')
const regLabelLogin = document.getElementById('regLabelLogin') 
const regLabelPass = document.getElementById('regLabelPass')
const regLabelPassConfirm = document.getElementById('regLabelPassConfirm')

const dropbtn = document.querySelector('.register__dropbtn')
const dropdownContent = document.querySelector('.register__dropdown-content')
const dropbtnText = document.querySelector('.register__dropbtnText')

const gthy = document.querySelector('.signIn__title')


const api = new Api()

signInCheckbox.addEventListener("change", (evt) => {
    if (evt.target.checked) {
        formRegistration.style.display = "flex";
        formSignIn.style.display = "none";
    } else {
        formSignIn.style.display = "flex";
        formRegistration.style.display = "none";
    }
})

dropbtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    console.log('click')
    console.log(dropdownContent.style.display)
    if (dropdownContent.style.display == "none" || dropdownContent.style.display == "") {
        dropdownContent.style.display = "block"
    } else {
        dropdownContent.style.display = "none"
    }   
    console.log(dropdownContent.style.display)
})

dropdownContent.addEventListener('click', (evt) => {
    dropbtnText.textContent = evt.target.textContent
    dropbtnText.style.color = 'black'
    dropdownContent.style.display = "none"
})



formRegistration.addEventListener('submit', (evt) => {
    evt.preventDefault()
    api.createUser(regLogin, regLabelLogin)
})

formSignIn.addEventListener('submit', (evt) => {
    evt.preventDefault()
    // api.getUsers()
    // api.getUser(2)
    const userEmail = signInLogin.value
    const userPassword = signInPassword.value
    signIn(userEmail, userPassword)
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


