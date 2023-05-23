import '../vendor/normalize.css'
import '../pagesCSS/index.css'
import { Api } from './utils/apiAuth'
import { Validation } from './utils/validation'

const formSignIn = document.querySelector('.signIn__form')
const signInLogin = document.querySelector('.signIn__input_type_login')
const signInPassword = document.querySelector('.signIn__input_type_password')
const signInCheckbox = document.querySelector('.signIn__checkbox')
const signInLabelStatus = document.querySelector('#signInLabelStatus')

const formRegistration = document.querySelector('.register__form')
const regLogin = document.querySelector('.register__input_type_login')
const regLabelLogin = document.getElementById('regLabelLogin') 
const regPassword = document.querySelector('.register__input_type_password')
const regLabelPassword = document.querySelector('#regLabelPass')
const regPasswordConf = document.querySelector('.register__input_type_passwordCheck')
const regLabelPasswordConf = document.querySelector('#regLabelPassConfirm')
const regName = document.querySelector('.register__input_type_name')
const regLabelName = document.querySelector('#regLabelName')
const regFacts = document.querySelector('.register__textarea_type_things')
const regLabelFacts = document.querySelector('#regThings')

const regLables = document.querySelectorAll('.register__label')
const regLabelStatus = document.querySelector('#regLabelStatus')

const dropbtn = document.querySelector('.register__dropbtn')
const dropdownContent = document.querySelector('.register__dropdown-content')
const dropbtnText = document.querySelector('.register__dropbtnText')
const dropLabel = document.querySelector('#regInterest')

const apiIndex = new Api()
const valid = new Validation()

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
    regLabelName.textContent = valid.userName(regName)
    dropLabel.textContent = valid.interest(dropbtnText)
    regLabelFacts.textContent = valid.facts(regFacts)
    regLabelLogin.textContent = valid.email(regLogin)
    regLabelPassword.textContent = valid.password(regPassword)
    regLabelPasswordConf.textContent = valid.twoPasswods(regPassword ,regPasswordConf)

    if (!(Array.from(regLables).some((item) => item.textContent !== ''))) {
        apiIndex.createUser(regLogin.value, regPassword.value, regLabelStatus, regName.value, dropbtnText.textContent, regFacts.value, apiIndex.changeProfileData)
    }
})

//login user
formSignIn.addEventListener('submit', (evt) => {
    evt.preventDefault()
    apiIndex.signIn(signInLogin.value, signInPassword.value, signInLabelStatus)
})

