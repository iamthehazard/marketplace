"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = shuffle;
function shuffle(array) {
  //Fisher-Yates, O(n)
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m);
    m--;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}