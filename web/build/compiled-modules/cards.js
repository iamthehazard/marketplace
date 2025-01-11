"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tuple = exports.Card = void 0;
exports.cardCompare = cardCompare;
exports.tupleCompare = tupleCompare;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var Card = exports.Card = /*#__PURE__*/_createClass(function Card(value, suit) {
  _classCallCheck(this, Card);
  this.value = value;
  this.suit = suit;
  /*
  val: an integer
  suit: a string
  */
});
function cardCompare(a, b) {
  //sorts in DESCENDING ORDER
  if (a.value !== b.value) return b.value - a.value;
  return b.suit.charCodeAt(0) - a.suit.charCodeAt(0);
}
var Tuple = exports.Tuple = /*#__PURE__*/_createClass(function Tuple(value, num) {
  _classCallCheck(this, Tuple);
  this.value = value;
  this.num = num;
});
function tupleCompare(a, b) {
  if (a.num !== b.num) return b.num - a.num;else return b.value - a.value;
}