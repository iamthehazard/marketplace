import {Card, cardCompare} from "./cards.js"

export default class Player {
    constructor(cards, id, name) {
        this.cards = cards;
        this.cards.sort(cardCompare);
        this.id = id;
        this.name = name;
    }

    addCard(card) { //this one sparks joy
        this.cards.push(card);
        this.cards.sort(cardCompare);
    }

    addCards(cards) {
        for (let i = 0; i < cards.length; i++) this.cards.push(cards[i]);
        this.cards.sort(cardCompare);
    }

    removeCard(card) { //this one does not spark joy
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].value === card.value && this.cards[i].suit === card.suit) {
                this.cards.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}