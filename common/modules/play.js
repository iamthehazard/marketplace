import {Card, cardCompare, Tuple, tupleCompare} from "./cards.js"

export class Play {
    constructor(cards) { //cards is an array of Card objects, sorted in ascending order
        this.cards = cards;

        const tuples = [];
        let start = 0;
        let end = 0; //start and end of current block of cards we're adding to a tuple
        let numCards = 0;
        while (end < cards.length) {
            if (cards[start].value === cards[end].value) {
                numCards++;
                end++;
            } else {
                tuples.push(new Tuple(cards[start].value, numCards));
                start = end;
                numCards = 0;
            }
        }
        tuples.push(new Tuple(cards[start].value, numCards));
        tuples.sort(tupleCompare);
        //tuples.reverse();
        console.log(tuples);

        this.tuples = tuples;
        this.id = {}; //tuple size, highest, length, attached size
    }

    isValid() { //doesn't check if it beats previous winner, only that it makes sense. also gives you id
        if (this.tuples.length === 0) return false;

        this.id.size = this.tuples[0].num;
        this.id.highest = this.tuples[0].value;
        
        if (this.tuples.length == 2 && this.tuples[0].value == values.HJ && this.tuples[1].value == values.LJ && this.tuples[0].num == numDecks && this.tuples[1].num == numDecks) {this.id.size = -1; return true;} //joker bomb

        if (this.tuples[0].num === 1) {
            this.id.length = this.tuples.length;
            this.id.attached = 0;
            if (this.tuples.length === 1) return true;
            if (this.tuples.length < 5) return false;
            if (this.tuples[0].value > values.A) return false;
            for (let i = 0; i < this.tuples.length-1; i++) {
                if (this.tuples[i].value !== this.tuples[i+1].value + 1) return false;
            }
            return true;
        }
        if (this.tuples[0].num === 2) {
            this.id.length = this.tuples.length;
            this.id.attached = 0;
            if (this.tuples.length === 1) return true;
            if (this.tuples.length < 3) return false;
            if (this.tuples[0].value > values.A) return false;
            for (let i = 0; i < this.tuples.length-1; i++) {
                if (this.tuples[i].value !== this.tuples[i+1].value + 1) return false;
            }
            return true;
        }
        if (this.tuples[0].num === 3) {
            let numTriples = 1;
            let i = 1;
            while (i < this.tuples.length && this.tuples[i].num === 3) {
                if (this.tuples[i].value !== this.tuples[i-1].value - 1) return false; //must be consecutive. if we only have one triplet this loop never runs
                numTriples++;
                i++;
            }
            this.id.length = numTriples;
            if (numTriples > 1 && this.tuples[0].value > values.A) return false;
            if (numTriples === this.tuples.length) {this.id.attached = 0; return true;} //nothing attached
            if (2*numTriples !== this.tuples.length) return false; //in this case we have to attach numTriples tuples
            if (this.tuples[numTriples].num === this.tuples[2*numTriples-1].num) {this.id.attached = this.tuples[numTriples].num; return true;}
            return false;
        }

        //main tuple is at least 4 cards
        let numTuples = 1;
        let i = 1;
        while (i < this.tuples.length && this.tuples[i].num === this.tuples[0].num) {
            if (this.tuples[i].value !== this.tuples[i-1].value - 1) return false; //must be consecutive. if we only have one tuple this loop never runs
            numTuples++;
            i++;
        }
        this.id.length = numTuples;
        if (numTuples > 1 && this.tuples[0].value > values.A) return false;
        if (numTuples === this.tuples.length) {this.id.attached = 0; return true;} //nothing attached
        if (3*numTuples !== this.tuples.length) return false; //in this case we have to attach 2*numTriples tuples
        if (this.tuples[numTuples].num === this.tuples[3*numTuples-1].num && this.tuples[numTuples].num <= 2) {this.id.attached = this.tuples[numTuples].num; return true;}
        return false;
    }

    beats(other) {
        if (this === null) return false;
        if (!this.isValid()) return false;
        if (other === null) return true;
        if (!other.isValid()) return true;
        if (this.id.size === -1) return true; //joker bomb
        if (other.id.size === -1) return false;
        
        if (this.id.size >= 4 && this.id.length === 1 && this.id.attached === 0) { //bomb
            if (!(other.id.size >= 4 && other.id.length === 1 && other.id.attached === 0)) return true;

            //previous play is also a bomb
            if (this.id.size > other.id.size || (this.id.size === other.id.size && this.id.highest > other.id.highest)) return true;
            return false;
        }

        return (this.id.size === other.id.size && this.id.length === other.id.length && this.id.attached === other.id.attached && this.id.highest > other.id.highest);
    }
}

export function stringToPlay(str) { //helper function, converts everything to hearts. doesn't support 10/LJ/HJ
    const cards = [];
    for (let i = 0; i < str.length; i++) {
        cards.push(new Card(values[str.charAt(i)], suits.heart));
    }
    cards.sort(cardCompare);
    return cards;
}