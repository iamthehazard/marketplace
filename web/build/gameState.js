"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var GameState = /*#__PURE__*/_createClass(function GameState(numDecks) {
  _classCallCheck(this, GameState);
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
});
module.exports = GameState;