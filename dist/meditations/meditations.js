"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMedFromCatById = exports.deleteMedFromCat = exports.addMedToCat = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
const addMedToCat = async (req, res) => {
  const data = {
    time: new Date().getTime() / 1000,
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    meditationLink: "",
    tags: JSON.parse(req.body.tags)
  };
  console.log(req.body.tags);
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/meditations/med/${req.files["background"].name}`);
    await (0, _storage.uploadBytes)(storageRef, req.files["background"].data);
    const url = await (0, _storage.getDownloadURL)(storageRef);
    const storageRef2 = (0, _storage.ref)(_config_fire.storage, `/meditations/med/${req.files["meditationLink"].name}`);
    await (0, _storage.uploadBytes)(storageRef2, req.files["meditationLink"].data);
    const url2 = await (0, _storage.getDownloadURL)(storageRef2);
    data["meditationLink"] = url2;
    data["background"] = url;
    data["id"] = (0, _uuid.v4)();
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_meditati", uid);
    const medcat = await (0, _firestore.getDoc)(cat_ref);
    const cat = medcat.data();
    cat.meditationRoutines.push(data);
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
exports.addMedToCat = addMedToCat;
const deleteMedFromCat = async (req, res) => {
  try {
    console.log(req.body);
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_meditati", req.body.uid);
    const medcat = await (0, _firestore.getDoc)(cat_ref);
    let cat = medcat.data();
    const id = req.body.id;
    cat.meditationRoutines = cat.meditationRoutines.filter(obj => obj.id !== id);
    // cat.meditationRoutines.push(data);
    //console.log(cat);
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
exports.deleteMedFromCat = deleteMedFromCat;
const getMedFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_meditati", req.params.uid);
    const medcat = await (0, _firestore.getDoc)(cat_ref);
    let cat = medcat.data();
    const id = req.params.id;
    const rez = cat.meditationRoutines.filter(obj => obj.id === id);
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
exports.getMedFromCatById = getMedFromCatById;