"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getbyid = exports.getListenCatById = exports.getAllListenCats = exports.deleteListenCatById = exports.addListenCat = void 0;
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
const addListenCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    order: req.body.order,
    listenRoutines: []
  };
  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/listen/cat/${req.files["backgroundImage"].name}`);
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
    const document = await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "categorie_listen"), data);
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
exports.addListenCat = addListenCat;
const getAllListenCats = async (req, res) => {
  let data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await (0, _auth.check)(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const listenCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_listen"), (0, _firestore.orderBy)("order", "desc"));
    listenCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    data = orderByField(data, "order", false);
    if (abonament != false && abonament != "") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].listenRoutines.length; j++) {
          data[i].listenRoutines[j].isLocked = false;
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      data[i].listenRoutines = orderByField(data[i].listenRoutines, "time", true);
      console.log(data[i].listenRoutines);
    }
    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getAllListenCats = getAllListenCats;
const getListenCatById = async (req, res) => {
  //console.log(req.params.id);
  try {
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", req.params.id);
    const listencat = await (0, _firestore.getDoc)(ref);
    res.status(200).json({
      ok: true,
      data: _objectSpread({
        uid: listencat.id
      }, listencat.data())
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getListenCatById = getListenCatById;
const deleteListenCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", req.body.id);
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
exports.deleteListenCatById = deleteListenCatById;
const getbyid = async (req, res) => {
  const {
    id
  } = req.params;
  console.log(id);
  let final;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await (0, _auth.check)(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const medCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_listen"));
    medCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].listenRoutines.length; j++) {
        // if (data[i].listenRoutines.length > 0)
        if (data[i].listenRoutines[j].id == id) {
          if (abonament != false && abonament != "") {
            data[i].listenRoutines[j].isLocked = false;
          }
          final = data[i].listenRoutines[j];
          break;
        } else {
          data[i].listenRoutines.splice(j, 1);
          j--;
        }
      }
    }
    //console.log(abonament);
    // console.log(data);
    console.log(final);
    res.status(200).json({
      data: _objectSpread({}, final)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getbyid = getbyid;