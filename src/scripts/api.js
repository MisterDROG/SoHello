var Hashes = require('jshashes')

export class Api {
    constructor() {
    }

    signIn() {
        console.log('signIn')
    }

    createUser(login, errField) {
        errField.textContent = ''
        console.log('starting register...')
        fetch ('http://localhost:8080/v1/user', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            //   },
            body: JSON.stringify({
                // name: name.value,
                // interest: interest.textContent,
                // userCharacteristics: charcacter.value,
                email: login.value,            
            })
        })
        .then((res) => {
            if (res.ok) {
                return 'password created'
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {
            console.log(res)
            window.open('../passwordChange.html', '_self')
        })
        .catch((error) => {
            console.log(error)
            errField.textContent = error
        })
    }

    createPassword(password, errField) {
        errField.textContent = ''
        const base = new Hashes.SHA512().b64(password)        
        fetch (`http://localhost:8081/api/v1/user/0/password`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                passwordHash: base
            })
        })
        .then((res) => {
            if (res.ok) {
                return 'password created'
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {console.log(res)})
        .catch((error) => {
            console.log(error)
            errField.textContent = error
        })
    }
}