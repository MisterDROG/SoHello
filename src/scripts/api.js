var Hashes = require('jshashes')

export class Api {
    constructor() {
    }

    getUsers() {
        return fetch(`http://localhost:8090/api/user`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Server error: ${response.status}`)
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    getUser(userId) {
        return fetch(`http://localhost:8090/api/user/${userId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Server error: ${response.status}`)
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    userIsActive(userEmail, userId) {      
        fetch (`http://localhost:8090/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                isActive: true
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {console.log(res)})
        .catch((error) => {
            console.log(error)
        })
    } 

    createUser(login, errField) {
        errField.textContent = ''
        fetch ('http://localhost:8090/register', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                // name: name.value,
                // interest: interest.textContent,
                // userCharacteristics: charcacter.value,
                email: login.value,            
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {
            console.log(res)
            const userId = {
                userId: res.id
            }
            localStorage.setItem('userId', JSON.stringify(userId))
        })
        .then(() => {
            const id = JSON.parse(localStorage.getItem('userId')).userId
            this.userIsActive(login.value, id)
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
        const gotUserId = JSON.parse(localStorage.getItem('userId')).userId
        console.log('User ID: ', gotUserId)
        const base = new Hashes.SHA512().b64(password)        
        fetch (`http://localhost:8090/user/${gotUserId}/password`, {
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
        .then((res) => {
            console.log(res)
            localStorage.clear()
            window.open('../index.html#top', '_self')
        })
        .catch((error) => {
            console.log(error)
            errField.textContent = error
        })
    }

    signIn(userEmail, password) {   
        const base = new Hashes.SHA512().b64(password)     
        fetch (`http://localhost:8090/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                login: userEmail,
                passwordHash: base
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {
            console.log(res)
            localStorage.setItem('userData', JSON.stringify(res))
            window.open('../personalAccount.html', '_self')
        })
        .catch((error) => {
            console.log(error)
        })
    } 

    logOut() {   
        const tokenUser = JSON.parse(localStorage.getItem('userData')).token
        fetch (`http://localhost:8090/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokenUser}`,
            }
        })
        .then((res) => {
            if (res.ok) {
                return 'Logout done';
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {
            console.log(res)
            localStorage.clear()
            window.open('../index.html', '_self')
        })
        .catch((error) => {
            console.log(error)
        })
    } 

    refreshToken() {  
        const userRefreshToken = JSON.parse(localStorage.getItem('userData')).refreshToken    
        fetch (`http://localhost:8090/refreshToken`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                refreshToken: userRefreshToken,
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Server error: ${res.status}`)
        })
        .then((res) => {console.log(res)})
        .catch((error) => {
            console.log(error)
        })
    } 
}
