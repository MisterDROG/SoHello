import '../vendor/normalize.css'
import '../pages/index.css'
import { Api } from './utils/apiAuth'

const formSignIn = document.querySelector('.signIn__form')
const signInLogin = document.querySelector('.signIn__input_type_login')
const signInPassword = document.querySelector('.signIn__input_type_password')
const signInCheckbox = document.querySelector('.signIn__checkbox')

const formRegistration = document.querySelector('.register__form')
const regLogin = document.querySelector('.register__input_type_login')
const regLabelLogin = document.getElementById('regLabelLogin') 
const regPassword = document.querySelector('.register__input_type_password')
const regName = document.querySelector('.register__input_type_name')
const regFacts = document.querySelector('.register__textarea_type_things')

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
    apiIndex.createUser(regLogin.value, regPassword.value, regLabelLogin, regName.value, dropbtnText.textContent, regFacts.value, apiIndex.changeProfileData)
})

//login user
formSignIn.addEventListener('submit', (evt) => {
    evt.preventDefault()
    apiIndex.signIn(signInLogin.value, signInPassword.value)
})


