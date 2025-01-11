"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PlayerList;
var _playerBox = _interopRequireDefault(require("./playerBox.js"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var socket = io();
function PlayerList(_ref) {
  var state = _ref.state;
  var _useState = (0, _react.useState)(state),
    _useState2 = _slicedToArray(_useState, 2),
    gameState = _useState2[0],
    setGameState = _useState2[1];
  var playerList = gameState.playerOrder.map(function (p) {
    return gameState.players[p];
  }); //player objects in order
  var playerBoxes = [];
  function handleReordering(index, isLeft) {
    if (index === 0 && isLeft || index === playerList.length - 1 && !isLeft) return;
    if (isLeft) socket.emit("swapPlayerOrder", index, index - 1);else socket.emit("swapPlayerOrder", index, index + 1);
  }
  (0, _react.useEffect)(function () {
    var handleEvent = function handleEvent(e) {
      return setGameState(e.detail);
    };
    document.addEventListener("socketUpdateGameState", handleEvent);
    return function () {
      document.removeEventListener("socketUpdateGameState", handleEvent);
    };
  }, []);
  var _loop = function _loop(i) {
    var format = 0;
    if (gameState.curPlayer == i) format = 1;else if (gameState.winningPlayer == i) format = 2;
    playerBoxes[i] = /*#__PURE__*/(0, _jsxRuntime.jsx)(_playerBox["default"], {
      player: playerList[i],
      inGame: gameState.gameStage != 0,
      formatState: format,
      handleClickLeft: function handleClickLeft() {
        return handleReordering(i, true);
      },
      handleClickRight: function handleClickRight() {
        return handleReordering(i, false);
      }
    }, i);
  };
  for (var i = 0; i < playerList.length; i++) {
    _loop(i);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
    className: "player-list",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        children: playerBoxes
      })
    })
  });
}