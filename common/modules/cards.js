export class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        /*
        val: an integer
        suit: a string
        */
    }
}

export function cardCompare(a, b) { //sorts in DESCENDING ORDER
    if (a.value !== b.value) return b.value - a.value;
    return b.suit.charCodeAt(0) - a.suit.charCodeAt(0);
}

export class Tuple {
    constructor(value, num) {
        this.value = value;
        this.num = num;
    }
}

export function tupleCompare(a, b) {
    if (a.num !== b.num) return b.num - a.num;
    else return b.value - a.value;
}