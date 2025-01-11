//todo: testing, then some ui things (use reactjs)

import {suits, values} from "../common/modules/reference.js";
import GameState from "../common/modules/gameState.js";
import {Card, cardCompare, Tuple, tupleCompare} from "../common/modules/cards.js";
import {Play, stringToPlay} from "../common/modules/play.js";
import Player from "../common/modules/player.js";
import shuffle from "../common/modules/shuffle.js";
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

let state = new GameState(1);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("./web"));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(dirname(fileURLToPath(import.meta.url)) + "/../web/index.html"));
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.emit("connected");

    socket.on("join", (name) => {
        if (!state.playerOrder.includes(name)) {
            console.log(socket.id);
            const p = new Player([], socket.id, name);
            state.players[name] = p;
            state.playerOrder.push(name);
        }
        console.log(state.playerOrder);
        io.emit("updateState", state);
    });

    socket.on("disconnect", () => {});
    //implement some system later
    //we don't want to wipe the user either

    socket.on("gameStart", () => {
        for (let i = 0; i < state.numDecks; i++) {
            for (let val = 1; val <= 13; val++) {
                state.deck.push(new Card(val, suits.heart));
                state.deck.push(new Card(val, suits.diamond));
                state.deck.push(new Card(val, suits.spade));
                state.deck.push(new Card(val, suits.club));
            }
            state.deck.push(new Card(14, suits.none)); //jokers
            state.deck.push(new Card(15, suits.none));
        }

        shuffle(state.deck);

        for (let i = 0; i < state.playerOrder.length; i++) {
            state.drawingCards.push(state.deck.pop());
        }
        state.faceUpCard = -1;

        state.gameStage = 1;

        io.emit("updateState", state);
    });

    socket.on("draw", (name, index, action) => {
        if (state.gameStage !== 1) return;
        if (state.drawingCards[index] == null) return; //== not ===
        if (action === 1) {
            if (state.faceUpCard !== -1) return;
            else state.faceUpCard = index;
        } else if (state.action === 2) {
            state.players[name].addCard(state.deck[index]);
            state.drawingCards[index] = null;
            if (state.faceUpCard === index) state.faceUpCard = -1;
        }

        if (state.drawingCards.filter((card) => card != null).length === 0) {
            if (state.deck.length === 0) {
                state.gameStage = 2;
            }
            
            for (let i = 0; i < state.playerOrder.length && state.deck.length > 0; i++) {
                state.drawingCards.push(state.deck.pop());
            }
            state.faceUpCard = -1;
        }

        io.emit("updateState", state);
    })

    socket.on("play", (name, cards) => {
        if (state.gameStage !== 2) return;
        if (name !== state.playerOrder[state.curPlayer]) return;

        for (let i = 0; i < cards.length; i++) {
            if (!state.players[name].removeCard(cards[i])) {
                state.players[name].addCards(cards.slice(0, i));
                return;
            }
        }

        const play = new Play(cards);
        if (play.beats(state.winningPlay)) {
            console.log("successful play");
            state.winningPlay = play;
            state.winningPlayer = state.curPlayer;
            if (state.players[name].cards.length === 0) io.emit("gameWin", name, cards);
            else io.emit("updateState", state);
            state.curPlayer++; if (state.curPlayer === state.playerOrder.length) state.curPlayer = 0;
        } else {
            state.players[name].addCards(cards);
        }
        console.log(state.winningPlay);
    });

    socket.on("pass", (name) => {
        if (state.gameStage !== 2) return;
        if (name !== state.playerOrder[state.curPlayer]) return;

        if (state.winningPlayer === -1) return;

        state.curPlayer++; if (state.curPlayer === state.playerOrder.length) state.curPlayer = 0;
        if (state.curPlayer !== state.winningPlayer) {
            io.emit("updateState", state);
            console.log("passed");
        } else {
            state.winningPlayer = -1;
            state.winningPlay = null;
            io.emit("updateState", state);
            console.log("passed - play won");
        }
    });

    socket.on("swapPlayerOrder", (i1, i2) => {
        [state.playerOrder[i1], state.playerOrder[i2]] = [state.playerOrder[i2], state.playerOrder[i1]];

        io.emit("updateState", state);
    });

    socket.on("add card", (name, card) => { //mostly a helper function, should not be used in actual game
        if (!state.playerOrder.includes(name)) {
            console.log("did not find player " + name);
            return;
        }

        state.players[name].addCard(card);
    });

    socket.on("add cards", (name, cards) => { //mostly a helper function, should not be used in actual game
        if (!state.playerOrder.includes(name)) {
            console.log("did not find player " + name);
            return;
        }

        state.players[name].addCards(cards);
    });

    socket.on("EXECUTE", (code) => { //do not leave in live
        eval(code);
    })
});

server.listen(1729, () => {
    console.log("Listening on *:1729");
});