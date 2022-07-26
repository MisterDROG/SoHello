import '../vendor/normalize.css'
import '../pages/passwordChange.css'


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

formRegistration.addEventListener('submit', (evt) => {
    evt.preventDefault()
    if (valid.checkTwoPasswods(regPassword, regPasswordCheck)) {
        regLabelPass.textContent = ""
        regLabelPassConfirm.textContent = ""
        formSignIn.style.display = "flex";
        formRegistration.style.display = "none";
        signInCheckbox.checked = false;
        api.register(regLogin, regPassword)
        signIn__title.textContent = "Registration success! Please, sign in:"
    } else {
        regLabelPass.textContent = "*Different Passwords"
        regLabelPassConfirm.textContent = "*Different Passwords"
    }
})