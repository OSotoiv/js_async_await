// const baseURL = 'https://deckofcardsapi.com/api/deck';
const cardPile = document.querySelector('#card-pile'); // this is the display area to append the next card
const cardBTN = document.getElementById('card-button') // this button requset next card from deck
cardBTN.addEventListener('click', requestCard);

class Deck {
    constructor() {
        this.getNewDeck();
    }
    async getNewDeck() {
        try {
            const { data } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
            this.id = data.deck_id;
            this.remaining = data.remaining;
        } catch (e) {
            this.id = null;
        }
    }
    async getNextCard() {
        try {
            const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.id}/draw`)
            this.remaining = data.remaining;
            return data.cards[0];
        } catch (e) {
            throw e
        }
    }
}
const deck = new Deck()

function requestCard(event) {
    event.preventDefault();
    deck.getNextCard()
        .then(data => updatePage(data))
        .catch(error => alert(`${error} Try again later...`))
}

function updatePage(data) {
    isLastCard()
    // create the image element
    const newImage = document.createElement('img');
    // set the source and alt attributes
    newImage.src = data.image;
    newImage.alt = `${data.value} of ${data.suit}`;
    // set a random rotation angle
    const rotation = Math.floor(Math.random() * 360) + 1;
    // apply the rotation transform
    newImage.style.transform = `rotate(-${rotation}deg)`;
    // append the image to a parent element
    cardPile.appendChild(newImage);
}

function isLastCard() {
    if (deck.remaining === 0) {
        // remove card button
        cardBTN.remove()
    }
}