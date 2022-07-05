const signInLogin = document.querySelector('.signIn__input_type_login')
const signInPaaaword = document.getElementById('signIn__password')
const formSignIn = document.querySelector('.signIn__form')
const formRegistration = document.querySelector('.register__form')
const loginPlace = document.querySelector('.signIn__output_type_password')
const setButton = document.getElementById('button__set')
const signInCheckbox = document.querySelector('.signIn__checkbox')

let gettingLogin

// https://test-e79a5-default-rtdb.firebaseio.com/goods.json

// setButton.addEventListener('click', (evt) => {
//     loginPlace.value = gettingLogin
// })

signInCheckbox.addEventListener("change", (evt) => {
    if (evt.target.checked) {
        console.log(evt.target.checked)
        formRegistration.style.display = "flex";
        formSignIn.style.display = "none";
    } else {
        console.log(evt.target.checked)
        formSignIn.style.display = "flex";
        formRegistration.style.display = "none";
    }
})

formSignIn.addEventListener('submit', (evt) => {
    evt.preventDefault()
    return fetch('https://sohellotest-default-rtdb.firebaseio.com/users.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(signInLogin.value);
        let userAcc = userSearch(data, signInLogin.value)
        localStorage.setItem('userAcc', JSON.stringify(userAcc))
        window.open('../personalAccount.html', '_self')
        })
})


function userSearch (data, check) {
    let obj = {}
    data.forEach((user) => {
        if (user.email == check)
        obj = user
    })
    console.log(obj)
    return obj
}