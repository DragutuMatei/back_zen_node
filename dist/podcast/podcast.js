"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getpodcastFromCatById = exports.deletepodcastFromCat = exports.addpodcastToCat = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
const addpodcastToCat = async (req, res) => {
  const data = {
    category: req.body.category,
    background: "",
    title: req.body.title,
    isLocked: req.body.isLocked === "true",
    duration: req.body.duration,
    podcastLink: ""
  };
  const uid = req.body.uid;
  //console.log(req.files["background"]);
  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/podcast/pod/${req.files["background"].name}`);
    await (0, _storage.uploadBytes)(storageRef, req.files["background"].data);
    const url = await (0, _storage.getDownloadURL)(storageRef);
    const storageRef2 = (0, _storage.ref)(_config_fire.storage, `/podcast/pod/${req.files["podcastLink"].name}`);
    await (0, _storage.uploadBytes)(storageRef2, req.files["podcastLink"].data);
    const url2 = await (0, _storage.getDownloadURL)(storageRef2);
    data["podcastLink"] = url2;
    data["background"] = url;
    data["id"] = (0, _uuid.v4)();
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_podcast", uid);
    const podcastcat = await (0, _firestore.getDoc)(cat_ref);
    const cat = podcastcat.data();
    cat.podcastRoutines.push(data);
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
exports.addpodcastToCat = addpodcastToCat;
const deletepodcastFromCat = async (req, res) => {
  try {
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_podcast", req.body.uid);
    const podcastcat = await (0, _firestore.getDoc)(cat_ref);
    let cat = podcastcat.data();
    const id = req.body.id;
    cat.podcastRoutines = cat.podcastRoutines.filter(obj => obj.id !== id);
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
exports.deletepodcastFromCat = deletepodcastFromCat;
const getpodcastFromCatById = async (req, res) => {
  try {
    //console.log(req.params.uid);
    const cat_ref = (0, _firestore.doc)(_config_fire.db, "categorie_podcast", req.params.uid);
    const podcastcat = await (0, _firestore.getDoc)(cat_ref);
    let cat = podcastcat.data();
    const id = req.params.id;
    const rez = cat.podcastRoutines.filter(obj => obj.id === id);
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
exports.getpodcastFromCatById = getpodcastFromCatById;