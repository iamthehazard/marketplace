"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.suits = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var suits = exports.suits = {
  heart: "♡",
  diamond: "♢",
  spade: "♤",
  club: "♧",
  none: " " //for LJ/HJ
};
var values = exports.values = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  10: 8,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
  2: 13,
  LJ: 14,
  HJ: 15
}, "3", 1), "4", 2), "5", 3), "6", 4), "7", 5), "8", 6), "9", 7), "10", 8), "2", 13);

/*export const playTypes = {
    single : 1,
    straight : 2,
    pair : 3,
    "pair straight" : 4,
    triplet : 5,
    triplets : 5,
    "triplet and single" : 6,
    "triplets and single" : 6,
    "3+1" : 6,
    "triplet and pair" : 7,
    "triplets and pair" : 7,
    "3+2" : 7,
    "large airplane" : 8,
    "large tuple and single" : 9,
    "large tuple and singles" : 9,
    "quad and single" : 9,
    "quad and singles" : 9,
    "large tuples and single" : 9,
    "large tuples and singles" : 9,
    "quads and single" : 9,
    "quads and singles" : 9,
    "4+1" : 9,
    "4+1+1" : 9,
    "large tuple and pair" : 10,
    "large tuple and pairs" : 10,
    "quad and pair" : 10,
    "quad and pairs" : 10,
    "large tuples and pair" : 10,
    "large tuples and pairs" : 10,
    "quads and pair" : 10,
    "quads and pairs" : 10,
    "4+2" : 10,
    "4+2+2" : 10,
    bomb : 11
}*/