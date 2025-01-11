"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cards = require("./cards.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Player = exports["default"] = /*#__PURE__*/function () {
  function Player(cards, id, name) {
    _classCallCheck(this, Player);
    this.cards = cards;
    this.cards.sort(_cards.cardCompare);
    this.id = id;
    this.name = name;
  }
  return _createClass(Player, [{
    key: "addCard",
    value: function addCard(card) {
      //this one sparks joy
      this.cards.push(card);
      this.cards.sort(_cards.cardCompare);
    }
  }, {
    key: "addCards",
    value: function addCards(cards) {
      for (var i = 0; i < cards.length; i++) this.cards.push(cards[i]);
      this.cards.sort(_cards.cardCompare);
    }
  }, {
    key: "removeCard",
    value: function removeCard(card) {
      //this one does not spark joy
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === card.value && this.cards[i].suit === card.suit) {
          this.cards.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  }]);
}();