export class ApiMain {
    constructor(url) {
        this.apiUrl = url
    }

    signIn() {
        console.log('signIn')
    }

    register(login) {
        console.log('starting register...')
        fetch (this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                // name: name.value,
                // interest: interest.textContent,
                // userCharacteristics: charcacter.value,
                email: login.value,            
            })
        })
        .then((res) => {console.log(res)})
        .then((res) => {console.log('finished register')})
        .catch(() => {console.log('network problems')})
    }
}