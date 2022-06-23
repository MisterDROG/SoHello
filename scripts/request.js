const signInLogin = document.getElementById('signIn__login')
const signInPaaaword = document.getElementById('signIn__password')
const formRegistratiom = document.querySelector('.signIn')
const loginPlace = document.querySelector('.signIn__output_type_password')
const setButton = document.getElementById('button__set')

let gettingLogin

// https://test-e79a5-default-rtdb.firebaseio.com/goods.json

formRegistratiom.addEventListener('submit', (evt) => {
    evt.preventDefault()
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        // gettingLogin = data[0].email
        })
})

setButton.addEventListener('click', (evt) => {
    loginPlace.value = gettingLogin
})
