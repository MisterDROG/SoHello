import '../vendor/normalize.css'
import '../pages/passwordChange.css'
import { Api } from './api'


const passwordForm = document.querySelector('.register__form')
const passwordInput = document.querySelector('.register__input_type_password')
const passwordCheckInput = document.querySelector('.register__input_type_passwordCheck')

class Validation {
    checkTwoPasswods(firstInput, secondInput) {
        if (firstInput.value == secondInput.value) {
            return true
        } else {
            return false
        }
    }
}

const valid = new Validation()
const api = new Api()

passwordForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    if (valid.checkTwoPasswods(passwordInput, passwordCheckInput)) {
        regLabelPass.textContent = ""
        regLabelPassConfirm.textContent = ""
        api.createPassword(passwordInput.value, regLabelPassConfirm)
    } else {
        regLabelPass.textContent = "*Different Passwords"
        regLabelPassConfirm.textContent = "*Different Passwords"
    }
})