"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListenFromCatById = exports.deleteListenFromCat = exports.addListenToCat = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
const addListenToCat = async (req, res) => {
  const data = {
    time: new Date().getTime() / 1000,
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    listenLink: ""
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/listen/lis/${req.files["background"].name}`);
    await (0, _storage.uploadBytes)(storageRef, req.files["background"].data);
    const url = await (0, _storage.getDownloadURL)(storageRef);
    const storageRef2 = (0, _storage.ref)(_config_fire.storage, `/listen/lis/${req.files["listenLink"].name}`);
    await (0, _storage.uploadBytes)(storageRef2, req.files["listenLink"].data);
    const url2 = await (0, _storage.getDownloadURL)(storageRef2);
    data["listenLink"] = url2;
    data["background"] = url;
    data["id"] = (0, _uuid.v4)();
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", uid);
    const listencat = await (0, _firestore.getDoc)(cat_ref);
    const cat = listencat.data();
    cat.listenRoutines.push(data);
    await (0, _firestore.updateDoc)(cat_ref, cat);
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.addListenToCat = addListenToCat;
const deleteListenFromCat = async (req, res) => {
  try {
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", req.body.uid);
    const listencat = await (0, _firestore.getDoc)(cat_ref);
    let cat = listencat.data();
    const id = req.body.id;
    cat.listenRoutines = cat.listenRoutines.filter(obj => obj.id !== id);
    //console.log(cat);
    await (0, _firestore.updateDoc)(cat_ref, cat);
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.deleteListenFromCat = deleteListenFromCat;
const getListenFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", req.params.uid);
    const listencat = await (0, _firestore.getDoc)(cat_ref);
    let cat = listencat.data();
    const id = req.params.id;
    const rez = cat.listenRoutines.filter(obj => obj.id === id);
    res.status(200).json({
      ok: true,
      data: rez
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getListenFromCatById = getListenFromCatById;