import {createRoot} from "react-dom/client";
import CardElement from "./ui/cardElement.js";
import PlayerList from "./ui/playerList.js";

import {suits, values} from "./compiled-modules/reference.js";
import GameState from "./compiled-modules/gameState.js";
import {Card, cardCompare, Tuple, tupleCompare} from "./compiled-modules/cards.js";
import {Play, stringToPlay} from "./compiled-modules/play.js";
import Player from "./compiled-modules/player.js";
import shuffle from "./compiled-modules/shuffle.js";

import "../style.css";

var username = prompt("Enter username");
var state = new GameState(1);

const socket = io();
const domNode = document.getElementById("gameInfo");
const root = createRoot(domNode);

//const card = <CardElement /> //not actually a card, just testing
root.render(<CardElement />);
root.render(<PlayerList state={state}/>);

socket.on("connected", () => {
    socket.emit("join", username);
});

socket.on("updateState", (newState) => {
    state = newState;
    //card.setValue(state.playerOrder.length);
    document.dispatchEvent(new CustomEvent("setReactValue", {detail: state.playerOrder.length}));
    document.dispatchEvent(new CustomEvent("socketUpdateGameState", {detail: state}));
});

socket.on("gameWin", () => {
    console.log("game win"); //temporary
})