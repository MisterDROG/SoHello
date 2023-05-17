import '../vendor/normalize.css'
import '../pages/passwordChange.css'
import { Api } from './utils/api'
import { Validation } from './utils/validation'

const passwordForm = document.querySelector('.register__form')
const passwordInput = document.querySelector('.register__input_type_password')
const passwordCheckInput = document.querySelector('.register__input_type_passwordCheck')

const valid = new Validation()
const apiPasswordChange = new Api()

passwordForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    if (valid.checkTwoPasswods(passwordInput, passwordCheckInput)) {
        regLabelPass.textContent = ""
        regLabelPassConfirm.textContent = ""
        apiPasswordChange.createPassword(passwordInput.value, regLabelPassConfirm)
    } else {
        regLabelPass.textContent = "*Different Passwords"
        regLabelPassConfirm.textContent = "*Different Passwords"
    }
})