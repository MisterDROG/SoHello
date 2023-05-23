import '../vendor/normalize.css'
import '../pagesCSS/personalAcc.css'
import { exampleData } from './firebase/exampleData'
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

const profileEditPopUp = document.querySelector('.editPop')
const profileEditForm = document.querySelector('.editPop')
const profileEditExitBtn = document.querySelector('.editPop__cross')
const profileEditBtn = document.querySelector('.profile__editBtn')

const avatarEditPopUp = document.querySelector('.editAvatarPop')
const avatarEditForm = document.querySelector('.editAvatarPop')
const avatarEditExitBtn = document.querySelector('.editAvatarPop__cross')
const avatarEditBtn = document.querySelector('.profile__link-photo')
const avatarPhoto = document.querySelector('.profile__photo')
const avatarChooseBtn = document.querySelector('#profile__editChoose')
const avatarInput = document.querySelector('.editAvatarPop__input')
const avatarFilename = document.querySelector('#filenameText')

const inputEditName = document.querySelector('.input_type_Name')
const inputEditInterest = document.querySelector('.input_type_Interest')
const inputEditFacts = document.querySelector('.input_type_Threethings')

const historyGrid = document.querySelector('.history__grid')
const meetingMain = document.querySelector('.meeting__include')

const dropbtn = document.querySelector('.register__dropbtn')
const dropdownContent = document.querySelector('.register__dropdown-content')
const dropbtnText = document.querySelector('.register__dropbtnText')

const btnReady = document.querySelector('#button_user_ready')
const profileError = document.querySelector('#profileError')

const deleteAccBtn = document.querySelector('#footer__btnDel')
const deleteAccpopUp = document.querySelector('.deleteAccPop')
const deleteAccForm = document.querySelector('.deleteAccPop__form')
const deleteAccbtnNo = document.querySelector('.deleteAccPop__btnNo')
const deleteAccExitBtn = document.querySelector('.deleteAccPop__cross')

const apiPA = new Api()
let fileToStorage = ''
let userInterest = ''

async function getUsersData() {
    const result = await apiPA.getUsersFromDB()
    if (result) {
        return Object.values(result)
    } else {
        return exampleData
    }
}

function getPersonalData(usersFromDB) {
    let indexOfUser = 0
    if (apiPA.checkSignIn()) {
        const userEmail = apiPA.checkSignIn().email
        emailAcc.textContent = userEmail;
        indexOfUser = usersFromDB.findIndex((item) => item.email == userEmail)
    }  else {
        logOutBtn.disabled = true
        btnReady.disabled = true
        profileEditBtn.disabled = true
        deleteAccBtn.disabled = true
        profileError.textContent = 'You are not logged into your account. This is an example of how the personal account page looks like. Account buttons are disabled.'
        emailAcc.textContent = usersFromDB[indexOfUser].email;
    }

    nameAcc.textContent = usersFromDB[indexOfUser].name
    interestAcc.textContent = usersFromDB[indexOfUser].interest
    factsAcc.textContent = usersFromDB[indexOfUser].threeFacts

    userInterest = usersFromDB[indexOfUser].interest

    if (usersFromDB[indexOfUser].imgSrc !== "null") {
        avatarPhoto.src = usersFromDB[indexOfUser].imgSrc
    } else {
        avatarPhoto.src = './images/personMoc.png'
    }

    if (!usersFromDB[indexOfUser].ready) {
        btnReady.classList.add('history__button_type_offline')
        btnReady.textContent = 'Not Ready to meet'
    } else {
        btnReady.classList.remove('history__button_type_offline')
        btnReady.textContent = 'Ready to meet'
    }
    
    usersFromDB.splice(indexOfUser,1)
}

function insertUsersData(usersFromDB) {
    if (usersFromDB) {
        const readyUsers = usersFromDB.filter((user) => (user.ready == true && user.interest == userInterest))
        meetingMain.innerHTML = '';
        renderFriendCard(readyUsers.splice((Math.floor(Math.random() * readyUsers.length)),1)[0], meetingMain)
        historyGrid.innerHTML = '';
        for (let i=0; i <4 ; i++) {
            renderFriendCard(readyUsers.splice((Math.floor(Math.random() * readyUsers.length)),1)[0], historyGrid)
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

profileEditPopUp.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget|| evt.target == profileEditExitBtn) {
        profileEditPopUp.style.display = 'none';
    }
})

profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const userId = apiPA.checkSignIn().uid
    apiPA.changeProfileData({name: inputEditName.value, interest: inputEditInterest.textContent, threeFacts: inputEditFacts.value, key: userId})
    .then(() => {
        profileEditPopUp.style.display = 'none';
        window.location.reload()
    })
})

avatarEditBtn.addEventListener('click', () => {
    avatarEditPopUp.style.display = 'flex';
})

avatarEditPopUp.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget|| evt.target == avatarEditExitBtn) {
        avatarEditPopUp.style.display = 'none';
    }
})

avatarEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (fileToStorage) {
        apiPA.sendFileToStorage(fileToStorage)
        .then((res) => {
            console.log(res)
            const userId = apiPA.checkSignIn().uid
            apiPA.changeProfileData({imgSrc: res, key: userId})
        })
        .then(()=>{
            fileToStorage = ''
            avatarEditPopUp.style.display = 'none';
            window.location.reload()
        })
    }
})

avatarChooseBtn.addEventListener('click', () => {
    avatarInput.click()
})

avatarInput.addEventListener('change', (event) => {
    avatarFilename.textContent = event.target.files[0].name
    fileToStorage = event.target.files[0]
})

btnReady.addEventListener('click', (evt) => {
    evt.preventDefault();
    const userId = apiPA.checkSignIn().uid
    const curReady = btnReady.classList.contains('history__button_type_offline')
    apiPA.changeProfileData({ready: curReady, key: userId})
    .then(() => {
        window.location.reload()
    })
})

//open/close dropdown menu with interests
dropbtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (dropdownContent.style.display == "none" || dropdownContent.style.display == "") {
        dropdownContent.style.display = "block"
    } else {
        dropdownContent.style.display = "none"
    }   
})

//put to placeholder result of dropdown chouse of interest
dropdownContent.addEventListener('click', (evt) => {
    dropbtnText.textContent = evt.target.textContent
    dropbtnText.style.color = 'black'
    dropdownContent.style.display = "none"
})

//delete account open popup
deleteAccBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteAccpopUp.style.display = 'flex';
})

//delete account
deleteAccForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    apiPA.deleteUserFc(apiPA.deleteProfileData)
    deleteAccpopUp.style.display = 'none';
})

//delete account close popup
deleteAccpopUp.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget || evt.target == deleteAccbtnNo || evt.target == deleteAccExitBtn) {
        deleteAccpopUp.style.display = 'none';
    }
})
