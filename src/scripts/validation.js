export class Validation {
    checkTwoPasswods(firstInput, secondInput) {
        if (firstInput.value == secondInput.value) {
            return true
        } else {
            return false
        }
    }
}