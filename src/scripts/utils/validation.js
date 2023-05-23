import validator from 'validator';

//class for validation fields of forms
export class Validation {
    twoPasswods(firstInput, secondInput) {
        if (firstInput.value == secondInput.value) {
            return ''
        } else {
            return "Passwords are different"
        }
    }

    userName(input) {
        if (validator.isLength(input.value, { min: 6, max: 20 })) {
            return ''
        } else {
            return "Name should be from 6 to 20 symbpls"
        }
    }

    interest(input) {
        console.log('input.textContent',input.textContent)
        if (!(validator.isEmpty(input.textContent))) {
            return ''
        } else {
            return "Please, choose interest"
        }
    }

    facts(input) {
        if (validator.isLength(input.value, { min: 10, max: 200 })) {
            return ''
        } else {
            return "Facts should be from 10 to 20 symbpls"
        }
    }

    email(input) {
        if (validator.isEmail(input.value)) {
            return ''
        } else {
            return "Invalid email"
        }
    }

    password(input) {
        if (validator.isLength(input.value, { min: 6, max: 20 })) {
            return ''
        } else {
            return "Password should be from 6 to 20 symbpls"
        }
    }

}
