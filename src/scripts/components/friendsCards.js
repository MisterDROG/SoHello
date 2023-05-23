//function for render cards with users potential partners
export const renderFriendCard = (item, place) => {
    if (!item) {
        place.insertAdjacentHTML('beforeend', `
        <div class="history__text">
        Unfortunately, no more recomedations for you right now, please come back later.
        </div>`)
    } else {
        place.insertAdjacentHTML('beforeend', `
            <div class="history__card">
                <img class="history__photo" src="${item.imgSrc !== 'null' ? item.imgSrc : './images/friendMoc.png'}" alt="user photo">
                <h3 class="history__name">${item.name}</h3>
                <button class="profile__button ${item.ready ? 'profile__button_type_ready' : 'profile__button_type_offline'}">${item.ready ? 'Ready' : 'Offline'}</button>
                <p class="history__text">${item.email}</p>
                <p class="history__text">"${item.interest}"</p>
                <p class="history__text">"${item.threeFacts}"</p>
            </div>`)
    }
}