import '../vendor/normalize.css'
import '../pages/personalAcc.css'


const nameAcc = document.querySelector('#nameAcc')
const emailAcc = document.querySelector('#emailAcc')
const logOutBtn = document.querySelector('.header__link-lang')
const logOutpopUp = document.querySelector('.logoutPop')
const logOutForm = document.querySelector('.logoutPop__form')
const logOutbtnNo = document.querySelector('.logoutPop__btnNo')
const logOutExitBtn = document.querySelector('.logoutPop__cross')
const profileEditBtn = document.querySelector('.profile__editBtn')
const profileEditPopUp = document.querySelector('.editPop')
const profileEditForm = document.querySelector('.editPop')
const profileEditExitBtn = document.querySelector('.editPop__cross')


class ApiPersonal {
    constructor(options) {

    }

}



logOutBtn.addEventListener('click', () => {
    logOutpopUp.style.display = 'flex';
})

logOutForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    logOutpopUp.style.display = 'none';
})

logOutpopUp.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget || evt.target == logOutbtnNo || evt.target == logOutExitBtn) {
        logOutpopUp.style.display = 'none';
    }
})

profileEditBtn.addEventListener('click', () => {
    profileEditPopUp.style.display = 'flex';
})

profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileEditPopUp.style.display = 'none';
})

profileEditPopUp.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget|| evt.target == profileEditExitBtn) {
        profileEditPopUp.style.display = 'none';
    }
})


function getUser() {
    let userAcc = JSON.parse(localStorage.getItem('userAcc'))
    nameAcc.textContent = userAcc.name;
    emailAcc.textContent = userAcc.email;
}



// getUser()