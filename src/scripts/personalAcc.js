import '../vendor/normalize.css'
import '../pages/personalAcc.css'
import { Api } from './api'


const nameAcc = document.querySelector('#nameAcc')
const emailAcc = document.querySelector('#emailAcc')
const interestAcc = document.querySelector('#interestAcc')
const thingsAcc = document.querySelector('#thingsAcc')
const logOutBtn = document.querySelector('.header__link-lang')
const logOutpopUp = document.querySelector('.logoutPop')
const logOutForm = document.querySelector('.logoutPop__form')
const logOutbtnNo = document.querySelector('.logoutPop__btnNo')
const logOutExitBtn = document.querySelector('.logoutPop__cross')
const profileEditBtn = document.querySelector('.profile__editBtn')
const profileEditPopUp = document.querySelector('.editPop')
const profileEditForm = document.querySelector('.editPop')
const profileEditExitBtn = document.querySelector('.editPop__cross')

function getPersonalData() {
    let userAcc = JSON.parse(localStorage.getItem('userData'))
    nameAcc.textContent = userAcc.userId;
    emailAcc.textContent = userAcc.token;
    interestAcc.textContent = userAcc.refreshToken;
    // thingsAcc.textContent = userAcc.things;
}

const apiPA = new Api()

getPersonalData()

logOutBtn.addEventListener('click', () => {
    logOutpopUp.style.display = 'flex';
})

logOutForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    logOutpopUp.style.display = 'none';
    apiPA.logOut(token)
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