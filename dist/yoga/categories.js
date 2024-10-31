"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getyogaCatById = exports.getAllyogaCats = exports.deleteyogaCatById = exports.addyogaCat = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
var _auth = require("../auth/auth");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const addyogaCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    yogaRoutines: []
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/yoga/cat/${req.files["backgroundImage"].name}`);
    // var reader = new window.FileReader();
    // reader.onload = function () {
    //   var blob = window.dataURLtoBlob(reader.result);
    // };

    // reader.readAsDataURL(req.files["backgroundImage"]);

    await (0, _storage.uploadBytes)(storageRef, req.files["backgroundImage"].data
    // reader/
    );
    const url = await (0, _storage.getDownloadURL)(storageRef);
    data["backgroundImage"] = url;
    data["id"] = (0, _uuid.v4)();
    const document = await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "categorie_yoga"), data);
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
exports.addyogaCat = addyogaCat;
const getAllyogaCats = async (req, res) => {
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await (0, _auth.check)(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const yogaCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_yoga"));
    yogaCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    if (abonament != false && abonament != "") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].yogaRoutines.length; j++) {
          data[i].yogaRoutines[j].isLocked = false;
        }
      }
    }
    //console.log(abonament);
    res.status(200).json({
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getAllyogaCats = getAllyogaCats;
const getyogaCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_yoga", req.params.id);
    const yogacat = await (0, _firestore.getDoc)(ref);
    res.status(200).json({
      ok: true,
      data: _objectSpread({
        uid: yogacat.id
      }, yogacat.data())
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getyogaCatById = getyogaCatById;
const deleteyogaCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_yoga", req.body.id);
    (0, _firestore.deleteDoc)(ref).then(r => {
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
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.deleteyogaCatById = deleteyogaCatById;