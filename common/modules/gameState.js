export default class GameState {
    constructor(numDecks) {
        this.numDecks = numDecks;
        this.players = {}; //maps usernames to Player objects
        this.playerOrder = []; //contains usernames in some sorted order

        this.curPlayer = 0; //index
        this.winningPlayer = -1; //index
        this.winningPlay = null;

        this.deck = [];
        this.drawingCards = []; //cards that can be drawn ("in the middle")
        this.faceUpCard = -1;

        this.gameStage = 0;
        /*
        0: not started
        (1: drawing)
        2: playing
        */
    }
}