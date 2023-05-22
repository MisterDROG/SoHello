const renderFriendCard = (item, place) => {
    if (!item) {
        place.insertAdjacentHTML('beforeend', `
        <div class="history__text">
        Unfortunately, no recomedations for you right now, please come back later.
        </div>`)
    } else {
        place.insertAdjacentHTML('beforeend', `
            <div class="history__card">
                <img class="history__photo" src="${item.imgSrc !== 'null' ? item.imgSrc : './images/friendMoc.png'}" alt="user photo">
                <h3 class="history__name">${item.name}</h3>
                <button class="history__button ${item.ready ? 'history__button_type_ready' : 'history__button_type_offline'}">${item.ready ? 'Ready' : 'Offline'}</button>
                <p class="history__text">${item.email}</p>
                <p class="history__text">"${item.interest}"</p>
                <p class="history__text">"${item.threeFacts}"</p>
            </div>`)
    }
}

export default renderFriendCard