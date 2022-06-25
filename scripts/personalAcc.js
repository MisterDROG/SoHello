const nameAcc = document.querySelector('#nameAcc')
const emailAcc = document.querySelector('#emailAcc')

function getUser() {
    let userAcc = JSON.parse(localStorage.getItem('userAcc'))
    nameAcc.textContent = userAcc.name;
    emailAcc.textContent = userAcc.email;
}

getUser()