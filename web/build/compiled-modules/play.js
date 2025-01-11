"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Play = void 0;
exports.stringToPlay = stringToPlay;
var _cards = require("./cards.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Play = exports.Play = /*#__PURE__*/function () {
  function Play(cards) {
    _classCallCheck(this, Play);
    //cards is an array of Card objects, sorted in ascending order
    this.cards = cards;
    var tuples = [];
    var start = 0;
    var end = 0; //start and end of current block of cards we're adding to a tuple
    var numCards = 0;
    while (end < cards.length) {
      if (cards[start].value === cards[end].value) {
        numCards++;
        end++;
      } else {
        tuples.push(new _cards.Tuple(cards[start].value, numCards));
        start = end;
        numCards = 0;
      }
    }
    tuples.push(new _cards.Tuple(cards[start].value, numCards));
    tuples.sort(_cards.tupleCompare);
    //tuples.reverse();
    console.log(tuples);
    this.tuples = tuples;
    this.id = {}; //tuple size, highest, length, attached size
  }
  return _createClass(Play, [{
    key: "isValid",
    value: function isValid() {
      //doesn't check if it beats previous winner, only that it makes sense. also gives you id
      if (this.tuples.length === 0) return false;
      this.id.size = this.tuples[0].num;
      this.id.highest = this.tuples[0].value;
      if (this.tuples.length == 2 && this.tuples[0].value == values.HJ && this.tuples[1].value == values.LJ && this.tuples[0].num == numDecks && this.tuples[1].num == numDecks) {
        this.id.size = -1;
        return true;
      } //joker bomb

      if (this.tuples[0].num === 1) {
        this.id.length = this.tuples.length;
        this.id.attached = 0;
        if (this.tuples.length === 1) return true;
        if (this.tuples.length < 5) return false;
        if (this.tuples[0].value > values.A) return false;
        for (var _i = 0; _i < this.tuples.length - 1; _i++) {
          if (this.tuples[_i].value !== this.tuples[_i + 1].value + 1) return false;
        }
        return true;
      }
      if (this.tuples[0].num === 2) {
        this.id.length = this.tuples.length;
        this.id.attached = 0;
        if (this.tuples.length === 1) return true;
        if (this.tuples.length < 3) return false;
        if (this.tuples[0].value > values.A) return false;
        for (var _i2 = 0; _i2 < this.tuples.length - 1; _i2++) {
          if (this.tuples[_i2].value !== this.tuples[_i2 + 1].value + 1) return false;
        }
        return true;
      }
      if (this.tuples[0].num === 3) {
        var numTriples = 1;
        var _i3 = 1;
        while (_i3 < this.tuples.length && this.tuples[_i3].num === 3) {
          if (this.tuples[_i3].value !== this.tuples[_i3 - 1].value - 1) return false; //must be consecutive. if we only have one triplet this loop never runs
          numTriples++;
          _i3++;
        }
        this.id.length = numTriples;
        if (numTriples > 1 && this.tuples[0].value > values.A) return false;
        if (numTriples === this.tuples.length) {
          this.id.attached = 0;
          return true;
        } //nothing attached
        if (2 * numTriples !== this.tuples.length) return false; //in this case we have to attach numTriples tuples
        if (this.tuples[numTriples].num === this.tuples[2 * numTriples - 1].num) {
          this.id.attached = this.tuples[numTriples].num;
          return true;
        }
        return false;
      }

      //main tuple is at least 4 cards
      var numTuples = 1;
      var i = 1;
      while (i < this.tuples.length && this.tuples[i].num === this.tuples[0].num) {
        if (this.tuples[i].value !== this.tuples[i - 1].value - 1) return false; //must be consecutive. if we only have one tuple this loop never runs
        numTuples++;
        i++;
      }
      this.id.length = numTuples;
      if (numTuples > 1 && this.tuples[0].value > values.A) return false;
      if (numTuples === this.tuples.length) {
        this.id.attached = 0;
        return true;
      } //nothing attached
      if (3 * numTuples !== this.tuples.length) return false; //in this case we have to attach 2*numTriples tuples
      if (this.tuples[numTuples].num === this.tuples[3 * numTuples - 1].num && this.tuples[numTuples].num <= 2) {
        this.id.attached = this.tuples[numTuples].num;
        return true;
      }
      return false;
    }
  }, {
    key: "beats",
    value: function beats(other) {
      if (this === null) return false;
      if (!this.isValid()) return false;
      if (other === null) return true;
      if (!other.isValid()) return true;
      if (this.id.size === -1) return true; //joker bomb
      if (other.id.size === -1) return false;
      if (this.id.size >= 4 && this.id.length === 1 && this.id.attached === 0) {
        //bomb
        if (!(other.id.size >= 4 && other.id.length === 1 && other.id.attached === 0)) return true;

        //previous play is also a bomb
        if (this.id.size > other.id.size || this.id.size === other.id.size && this.id.highest > other.id.highest) return true;
        return false;
      }
      return this.id.size === other.id.size && this.id.length === other.id.length && this.id.attached === other.id.attached && this.id.highest > other.id.highest;
    }
  }]);
}();
function stringToPlay(str) {
  //helper function, converts everything to hearts. doesn't support 10/LJ/HJ
  var cards = [];
  for (var i = 0; i < str.length; i++) {
    cards.push(new _cards.Card(values[str.charAt(i)], suits.heart));
  }
  cards.sort(_cards.cardCompare);
  return cards;
}