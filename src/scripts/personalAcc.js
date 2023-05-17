import '../vendor/normalize.css'
import '../pages/personalAcc.css'
import { Api } from './utils/apiAuth'
import renderFriendCard from './components/friendsCards'

const nameAcc = document.querySelector('#userName')
const emailAcc = document.querySelector('#userEmail')
const interestAcc = document.querySelector('#userInterest')
const factsAcc = document.querySelector('#userFacts')

const logOutBtn = document.querySelector('.header__link-lang')
const logOutpopUp = document.querySelector('.logoutPop')
const logOutForm = document.querySelector('.logoutPop__form')
const logOutbtnNo = document.querySelector('.logoutPop__btnNo')
const logOutExitBtn = document.querySelector('.logoutPop__cross')
const profileEditBtn = document.querySelector('.profile__editBtn')
const profileEditPopUp = document.querySelector('.editPop')
const profileEditForm = document.querySelector('.editPop')
const profileEditExitBtn = document.querySelector('.editPop__cross')

const historyGrid = document.querySelector('.history__grid')
const meetingMain = document.querySelector('.meeting__include')

const apiPA = new Api()

async function getUsersData() {
    if (!apiPA.checksignIn()) {
        return await apiPA.getUsersFromDB()
    } else {
        return undefined
    }
}

function getPersonalData(usersFromDB) {
    if (usersFromDB) {
        const userEmail = apiPA.checksignIn().email
        emailAcc.textContent = userEmail;

        const indexOfUser = usersFromDB.findIndex((item) => item.email == userEmail)

        nameAcc.textContent = usersFromDB[indexOfUser].name;
        interestAcc.textContent = usersFromDB[indexOfUser].interest;
        factsAcc.textContent = usersFromDB[indexOfUser].threeFacts;

        usersFromDB.splice(indexOfUser,1)
    }
}

function insertUsersData(usersFromDB) {
    if (usersFromDB) {
        meetingMain.innerHTML = '';
        renderFriendCard(usersFromDB.splice((Math.floor(Math.random() * usersFromDB.length)),1)[0], meetingMain)
        historyGrid.innerHTML = '';
        for (let i=0; i <4 ; i++) {
            renderFriendCard(usersFromDB.splice((Math.floor(Math.random() * usersFromDB.length)),1)[0], historyGrid)
        }
    }
}

async function insertDataToPage() {
    let usersFromDB = await getUsersData() 
    getPersonalData(usersFromDB)
    insertUsersData(usersFromDB)
}

insertDataToPage()

logOutBtn.addEventListener('click', () => {
    logOutpopUp.style.display = 'flex';
})

logOutForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    logOutpopUp.style.display = 'none';
    apiPA.signOut()
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
