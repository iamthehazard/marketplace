"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PlayerBox;
var _jsxRuntime = require("react/jsx-runtime");
function PlayerBox(_ref) {
  var player = _ref.player,
    inGame = _ref.inGame,
    formatState = _ref.formatState,
    handleClickLeft = _ref.handleClickLeft,
    handleClickRight = _ref.handleClickRight;
  /*
  formatState
  0: regular
  1: name in <b></b> (corresponds to current player)
  2: name green (corresponds to current winner)
  */

  var nameDisplay, otherDisplay;
  if (formatState === 0) nameDisplay = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      display: "block"
    },
    children: player.name
  });else if (formatState === 1) nameDisplay = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      display: "block"
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
      children: player.name
    })
  });else if (formatState === 2) nameDisplay = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      display: "block",
      color: "green"
    },
    children: player.name
  });
  if (inGame) {
    otherDisplay = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          fontSize: "24px"
        },
        children: "\uD83C\uDCA0"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        style: {
          fontSize: "12px"
        },
        children: ["\xD7", player.cards.length]
      })]
    });
  } else {
    otherDisplay = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleClickLeft,
        children: "<"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleClickRight,
        children: ">"
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
    className: "player-box",
    children: [nameDisplay, otherDisplay]
  });
}