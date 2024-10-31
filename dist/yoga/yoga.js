"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getyogaFromCatById = exports.deleteyogaFromCat = exports.addyogaToCat = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
const addyogaToCat = async (req, res) => {
  const data = {
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    yogaLink: ""
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/yoga/yog/${req.files["background"].name}`);
    await (0, _storage.uploadBytes)(storageRef, req.files["background"].data);
    const url = await (0, _storage.getDownloadURL)(storageRef);
    const storageRef2 = (0, _storage.ref)(_config_fire.storage, `/yoga/yog/${req.files["yogaLink"].name}`);
    await (0, _storage.uploadBytes)(storageRef2, req.files["yogaLink"].data);
    const url2 = await (0, _storage.getDownloadURL)(storageRef2);
    data["yogaLink"] = url2;
    data["background"] = url;
    data["id"] = (0, _uuid.v4)();
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_yoga", uid);
    const yogacat = await (0, _firestore.getDoc)(cat_ref);
    const cat = yogacat.data();
    cat.yogaRoutines.push(data);
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
exports.addyogaToCat = addyogaToCat;
const deleteyogaFromCat = async (req, res) => {
  try {
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_yoga", req.body.uid);
    const yogacat = await (0, _firestore.getDoc)(cat_ref);
    let cat = yogacat.data();
    const id = req.body.id;
    cat.yogaRoutines = cat.yogaRoutines.filter(obj => obj.id !== id);
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
exports.deleteyogaFromCat = deleteyogaFromCat;
const getyogaFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_yoga", req.params.uid);
    const yogacat = await (0, _firestore.getDoc)(cat_ref);
    let cat = yogacat.data();
    const id = req.params.id;
    const rez = cat.yogaRoutines.filter(obj => obj.id === id);
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
exports.getyogaFromCatById = getyogaFromCatById;