"use strict";

var _client = require("react-dom/client");
var _cardElement = _interopRequireDefault(require("./ui/cardElement.js"));
var _playerList = _interopRequireDefault(require("./ui/playerList.js"));
var _reference = require("./compiled-modules/reference.js");
var _gameState = _interopRequireDefault(require("./compiled-modules/gameState.js"));
var _cards = require("./compiled-modules/cards.js");
var _play = require("./compiled-modules/play.js");
var _player = _interopRequireDefault(require("./compiled-modules/player.js"));
var _shuffle = _interopRequireDefault(require("./compiled-modules/shuffle.js"));
require("../style.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var username = prompt("Enter username");
var state = new _gameState["default"](1);
var socket = io();
var domNode = document.getElementById("gameInfo");
var root = (0, _client.createRoot)(domNode);

//const card = <CardElement /> //not actually a card, just testing
root.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_cardElement["default"], {}));
root.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_playerList["default"], {
  state: state
}));
socket.on("connected", function () {
  socket.emit("join", username);
});
socket.on("updateState", function (newState) {
  state = newState;
  //card.setValue(state.playerOrder.length);
  document.dispatchEvent(new CustomEvent("setReactValue", {
    detail: state.playerOrder.length
  }));
  document.dispatchEvent(new CustomEvent("socketUpdateGameState", {
    detail: state
  }));
});
socket.on("gameWin", function () {
  console.log("game win"); //temporary
});