"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageById = exports.getAllMessages = exports.deleteMessage = exports.addMessage = void 0;
var _firestore = require("firebase/firestore");
var _uuid = require("uuid");
var _config_fire = require("../../config_fire");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const addMessage = async (req, res) => {
  const data = _objectSpread(_objectSpread({}, req.body), {}, {
    uid: (0, _uuid.v4)(),
    time: new Date().getTime() / 1000
  });
  //console.log(data);
  try {
    const document = await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "mesaje"), data);
    res.status(200).json({
      ok: true,
      id: document.id
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.addMessage = addMessage;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
function orderByField(array, field, ascending = true) {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return ascending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}
const getAllMessages = async (req, res) => {
  try {
    const data = [];
    const messages = await (
      //   getDocs(
      //   collection(db, "mesaje"),
      //   orderBy("time", "asc")
      // );
      (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "mesaje"))
    );
    messages.forEach(mes => {
      data.push(_objectSpread(_objectSpread({}, mes.data()), {}, {
        id: mes.id
      }));
    });
    res.status(200).json({
      data: shuffleArray(data)
    });
    // res.status(200).json({ data: orderByField(data, "time", false) });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getAllMessages = getAllMessages;
const deleteMessage = async (req, res) => {
  try {
    const id = req.body.id;
    const reff = (0, _firestore.doc)(_config_fire.db, "mesaje", id);
    (0, _firestore.deleteDoc)(reff).then(r => {
      //console.log(r);
      res.status(200).json({
        ok: true
      });
    }).catch(error => {
      res.status(500).json({
        ok: false,
        error
      });
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.deleteMessage = deleteMessage;
const getMessageById = async (req, res) => {
  try {
    const id = req.params.id;
    const reff = (0, _firestore.doc)(_config_fire.db, "mesaje", id);
    const message = await (0, _firestore.getDoc)(reff);
    res.status(200).json({
      ok: true,
      data: _objectSpread({
        id: message.id
      }, message.data())
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getMessageById = getMessageById;