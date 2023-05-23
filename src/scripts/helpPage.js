import '../vendor/normalize.css'
import '../pagesCSS/helpPage.css'
import { Api } from './utils/apiAuth'
import { Validation } from './utils/validation'

const formRegistration = document.querySelector('.register__form')
const regLogin = document.querySelector('.register__input_type_login')
const regPassword = document.querySelector('.register__input_type_password')
const regPasswordNew = document.querySelector('.register__input_type_passwordCheck')
const regLabelPasswordNew = document.querySelector('#regLabelPassConfirm')
const regLabelChangeConfirm = document.querySelector('#regLabelChangeConfirm')

const apiHelp = new Api()
const valid = new Validation()

//change password from help page
formRegistration.addEventListener('submit', (evt) => {
    evt.preventDefault()
    regLabelPasswordNew.textContent = valid.password(regPasswordNew)
    if (regLabelPasswordNew.textContent == '') {
        apiHelp.updateUserPassword(regLogin.value, regPassword.value, regPasswordNew.value, regLabelChangeConfirm)
    }
})