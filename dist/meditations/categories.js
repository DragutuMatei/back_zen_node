"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOthers2 = exports.getOthers = exports.getMedCatByIdRaw = exports.getMedCatById = exports.getAllMedCats = exports.deleteMedCatById = exports.addMedCat = void 0;
var _config_fire = require("../../config_fire.js");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
var _auth = require("../auth/auth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // // import { db, storage } from "../../config_fire.js";
// // import {
// //   addDoc,
// //   collection,
// //   deleteDoc,
// //   doc,
// //   getDoc,
// //   getDocs,
// //   orderBy,
// //   query,
// //   where,
// // } from "firebase/firestore";
// // import {
// //   ref,
// //   getDownloadURL,
// //   uploadBytesResumable,
// //   uploadBytes,
// // } from "firebase/storage";
// // import { v4 as uuid } from "uuid";
// // import { check } from "../auth/auth.js";
// // const addMedCat = async (req, res) => {
// //   const data = {
// //     categoryTitle: req.body.categoryTitle,
// //     backgroundImage: "",
// //     order: req.body.order,
// //     meditationRoutines: [],
// //   };
// //   //console.log(req.files["backgroundImage"]);
// //   try {
// //     const storageRef = ref(
// //       storage,
// //       `/meditations/cat/${req.files["backgroundImage"].name}`
// //     );
// //     // var reader = new window.FileReader();
// //     // reader.onload = function () {
// //     //   var blob = window.dataURLtoBlob(reader.result);
// //     // };
// //     // reader.readAsDataURL(req.files["backgroundImage"]);
// //     await uploadBytes(
// //       storageRef,
// //       req.files["backgroundImage"].data
// //       // reader/
// //     );
// //     const url = await getDownloadURL(storageRef);
// //     data["backgroundImage"] = url;
// //     data["id"] = uuid();
// //     const document = await addDoc(collection(db, "categorie_meditati"), data);
// //     res.status(200).json({ ok: true, id: document.id });
// //   } catch (error) {
// //     //console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // function orderByField(array, field, ascending = true) {
// //   return array.sort((a, b) => {
// //     if (a[field] < b[field]) {
// //       return ascending ? -1 : 1;
// //     }
// //     if (a[field] > b[field]) {
// //       return ascending ? 1 : -1;
// //     }
// //     return 0;
// //   });
// // }
// // const getAllMedCats = async (req, res) => {
// //   let data = [];
// //   let abonament = "";
// //   try {
// //     const [decodedToken, userId, user] = await check(req);
// //     abonament = user.abonament;
// //     console.log("Abonament1:", abonament);
// //   } catch (error) {
// //     abonament = false;
// //     console.log("Abonament2:", abonament);
// //   }
// //   try {
// //     const medCats = await getDocs(
// //       collection(db, "categorie_meditati"),
// //       orderBy("order", "desc")
// //     );
// //     medCats.forEach((doc) => {
// //       console.log(doc.data().order);
// //       data.push({ uid: doc.id, ...doc.data() });
// //     });
// //     data = orderByField(data, "order", false);
// //     console.log(abonament);
// //     if (abonament != false && abonament != "") {
// //       for (let i = 0; i < data.length; i++) {
// //         for (let j = 0; j < data[i].meditationRoutines.length; j++) {
// //           data[i].meditationRoutines[j].isLocked = false;
// //         }
// //         data[i].meditationRoutines = orderByField(
// //           data[i].meditationRoutines,
// //           "time",
// //           true
// //         );
// //       }
// //     }
// //     for (let i = 0; i < data.length; i++) {
// //       data[i].meditationRoutines = orderByField(
// //         data[i].meditationRoutines,
// //         "time",
// //         true
// //       );
// //     }
// //     // console.log("data: ", JSON.stringify(data));
// //     res.status(200).json({ data });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // const getMedCatById = async (req, res) => {
// //   const result = await getMedCatByIdRaw(req.params.id);
// //   if (result.ok) {
// //     res.status(200).json(result);
// //   } else {
// //     res.status(500).json(result);
// //   }
// // };
// // const getMedCatByIdRaw = async (id) => {
// //   try {
// //     const ref = doc(db, "categorie_meditati", id);
// //     const medcat = await getDoc(ref);
// //     return { ok: true, data: { uid: medcat.id, ...medcat.data() } };
// //   } catch (error) {
// //     return { ok: false, error };
// //   }
// // };
// // const deleteMedCatById = async (req, res) => {
// //   try {
// //     //console.log(req.body);
// //     const ref = doc(db, "categorie_meditati", req.body.id);
// //     deleteDoc(ref)
// //       .then((r) => {
// //         //console.log(r);
// //         res.status(200).json({ ok: true });
// //       })
// //       .catch((error) => {
// //         res.status(500).json({ ok: false, error });
// //       });
// //   } catch (error) {
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // const getOthers = async (req, res) => {
// //   const { id_cat, tag } = req.params;
// //   const data = [];
// //   let abonament = "";
// //   try {
// //     const [decodedToken, userId, user] = await check(req);
// //     abonament = user.abonament;
// //   } catch (error) {
// //     abonament = false;
// //   }
// //   try {
// //     const medCats = await getDocs(collection(db, "categorie_meditati"));
// //     medCats.forEach((doc) => {
// //       if (doc.id !== id_cat) {
// //         data.push({ uid: doc.id, ...doc.data() });
// //       }
// //     });
// //     for (let i = 0; i < data.length; i++) {
// //       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
// //         // if (data[i].meditationRoutines.length > 0)
// //         if (data[i].meditationRoutines[j].tags.includes(tag)) {
// //           if (abonament != false && abonament != "") {
// //             data[i].meditationRoutines[j].isLocked = false;
// //           }
// //         } else {
// //           data[i].meditationRoutines.splice(j, 1);
// //           j--;
// //         }
// //       }
// //     }
// //     //console.log(abonament);
// //     // console.log(data);
// //     res.status(200).json({ data });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // const getOthers2 = async (req, res) => {
// //   const { id } = req.params;
// //   let final;
// //   const data = [];
// //   let abonament = "";
// //   try {
// //     console.log("CHECEEEECKKK");
// //     const [decodedToken, userId, user] = await check(req);
// //     abonament = user.abonament;
// //   } catch (error) {
// //     abonament = false;
// //   }
// //   try {
// //     const medCats = await getDocs(collection(db, "categorie_meditati"));
// //     medCats.forEach((doc) => {
// //       data.push({ uid: doc.id, ...doc.data() });
// //     });
// //     for (let i = 0; i < data.length; i++) {
// //       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
// //         // if (data[i].meditationRoutines.length > 0)
// //         if (data[i].meditationRoutines[j].id == id) {
// //           if (abonament != false && abonament != "") {
// //             data[i].meditationRoutines[j].isLocked = false;
// //           }
// //           final = data[i].meditationRoutines[j];
// //           break;
// //         } else {
// //           data[i].meditationRoutines.splice(j, 1);
// //           j--;
// //         }
// //       }
// //     }
// //     //console.log(abonament);
// //     // console.log(data);
// //     console.log(final);
// //     res.status(200).json({ data: { ...final } });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // export {
// //   addMedCat,
// //   getAllMedCats,
// //   getMedCatByIdRaw,
// //   getMedCatById,
// //   deleteMedCatById,
// //   getOthers,
// //   getOthers2,
// // };
// // // id categorie si tag
// // // => sa nu aiba id categorie
// // // => [
// // // {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// // // {nume categorie, meditationroutines:[toate cu tagul respectiv]}
// // // ]
// // //
// // //
// // //
// import { db, storage } from "../../config_fire.js";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   uploadBytes,
// } from "firebase/storage";
// import { v4 as uuid } from "uuid";
// import { check } from "../auth/auth.js";
// const addMedCat = async (req, res) => {
//   const data = {
//     categoryTitle: req.body.categoryTitle,
//     backgroundImage: "",
//     order: req.body.order,
//     meditationRoutines: [],
//   };
//   //console.log(req.files["backgroundImage"]);
//   try {
//     const storageRef = ref(
//       storage,
//       `/meditations/cat/${req.files["backgroundImage"].name}`
//     );
//     // var reader = new window.FileReader();
//     // reader.onload = function () {
//     //   var blob = window.dataURLtoBlob(reader.result);
//     // };
//     // reader.readAsDataURL(req.files["backgroundImage"]);
//     await uploadBytes(
//       storageRef,
//       req.files["backgroundImage"].data
//       // reader/
//     );
//     const url = await getDownloadURL(storageRef);
//     data["backgroundImage"] = url;
//     data["id"] = uuid();
//     const document = await addDoc(collection(db, "categorie_meditati"), data);
//     res.status(200).json({ ok: true, id: document.id });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// function orderByField(array, field, ascending = true) {
//   return array.sort((a, b) => {
//     if (a[field] < b[field]) {
//       return ascending ? -1 : 1;
//     }
//     if (a[field] > b[field]) {
//       return ascending ? 1 : -1;
//     }
//     return 0;
//   });
// }
// const getAllMedCats = async (req, res) => {
//   let data = [];
//   let abonament = "";
//   let user = null;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//     try {
//       const [decodedToken, userId, userObj] = await check(req);
//       abonament = userObj.abonament;
//       user = userObj;
//     } catch (error) {
//       abonament = "";
//     }
//   } else {
//     abonament = ""; // user anonim
//   }
//   try {
//     const medCats = await getDocs(
//       collection(db, "categorie_meditati"),
//       orderBy("order", "desc")
//     );
//     medCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });
//     data = orderByField(data, "order", false);
//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//         data[i].meditationRoutines[j].isLocked = abonament
//           ? false
//           : data[i].meditationRoutines[j].isLocked;
//       }
//       data[i].meditationRoutines = orderByField(
//         data[i].meditationRoutines,
//         "time",
//         true
//       );
//     }
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };
// const getMedCatById = async (req, res) => {
//   const result = await getMedCatByIdRaw(req.params.id);
//   if (result.ok) {
//     res.status(200).json(result);
//   } else {
//     res.status(500).json(result);
//   }
// };
// const getMedCatByIdRaw = async (id) => {
//   try {
//     const ref = doc(db, "categorie_meditati", id);
//     const medcat = await getDoc(ref);
//     return { ok: true, data: { uid: medcat.id, ...medcat.data() } };
//   } catch (error) {
//     return { ok: false, error };
//   }
// };
// const deleteMedCatById = async (req, res) => {
//   try {
//     //console.log(req.body);
//     const ref = doc(db, "categorie_meditati", req.body.id);
//     deleteDoc(ref)
//       .then((r) => {
//         //console.log(r);
//         res.status(200).json({ ok: true });
//       })
//       .catch((error) => {
//         res.status(500).json({ ok: false, error });
//       });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };
// const getOthers = async (req, res) => {
//   const { id_cat, tag } = req.params;
//   const data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//   } catch (error) {
//     abonament = false;
//   }
//   try {
//     const medCats = await getDocs(collection(db, "categorie_meditati"));
//     medCats.forEach((doc) => {
//       if (doc.id !== id_cat) {
//         data.push({ uid: doc.id, ...doc.data() });
//       }
//     });
//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//         // if (data[i].meditationRoutines.length > 0)
//         if (data[i].meditationRoutines[j].tags.includes(tag)) {
//           if (abonament != false && abonament != "") {
//             data[i].meditationRoutines[j].isLocked = false;
//           }
//         } else {
//           data[i].meditationRoutines.splice(j, 1);
//           j--;
//         }
//       }
//     }
//     //console.log(abonament);
//     // console.log(data);
//     res.status(200).json({ data });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// const getOthers2 = async (req, res) => {
//   const { id } = req.params;
//   let final;
//   const data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, userObj] = await check(req);
//     abonament = userObj.abonament;
//     if (!abonament || abonament === "") {
//       return res.status(403).json({ error: "Premium required" });
//     }
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   try {
//     const medCats = await getDocs(collection(db, "categorie_meditati"));
//     medCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });
//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//         if (data[i].meditationRoutines[j].id == id) {
//           data[i].meditationRoutines[j].isLocked = false;
//           final = data[i].meditationRoutines[j];
//           break;
//         } else {
//           data[i].meditationRoutines.splice(j, 1);
//           j--;
//         }
//       }
//     }
//     res.status(200).json({ data: { ...final } });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };
// export {
//   addMedCat,
//   getAllMedCats,
//   getMedCatByIdRaw,
//   getMedCatById,
//   deleteMedCatById,
//   getOthers,
//   getOthers2,
// };
// // id categorie si tag
// // => sa nu aiba id categorie
// // => [
// // {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// // {nume categorie, meditationroutines:[toate cu tagul respectiv]}
// // ]
// //
// //
// //
const addMedCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    order: req.body.order,
    meditationRoutines: []
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = (0, _storage.ref)(_config_fire.storage, `/meditations/cat/${req.files["backgroundImage"].name}`);
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
    const document = await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "categorie_meditati"), data);
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
exports.addMedCat = addMedCat;
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
const getAllMedCats = async (req, res) => {
  let data = [];
  let abonament = "";
  let user = null;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      const [decodedToken, userId, userObj] = await (0, _auth.check)(req);
      abonament = userObj.abonament;
      user = userObj;
    } catch (error) {
      abonament = "";
    }
  } else {
    abonament = ""; // user anonim
  }
  try {
    const medCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_meditati"), (0, _firestore.orderBy)("order", "desc"));
    medCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    data = orderByField(data, "order", false);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        data[i].meditationRoutines[j].isLocked = abonament ? false : data[i].meditationRoutines[j].isLocked;
      }
      data[i].meditationRoutines = orderByField(data[i].meditationRoutines, "time", true);
    }
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
exports.getAllMedCats = getAllMedCats;
const getMedCatById = async (req, res) => {
  const result = await getMedCatByIdRaw(req.params.id);
  if (result.ok) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
exports.getMedCatById = getMedCatById;
const getMedCatByIdRaw = async id => {
  try {
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_meditati", id);
    const medcat = await (0, _firestore.getDoc)(ref);
    return {
      ok: true,
      data: _objectSpread({
        uid: medcat.id
      }, medcat.data())
    };
  } catch (error) {
    return {
      ok: false,
      error
    };
  }
};
exports.getMedCatByIdRaw = getMedCatByIdRaw;
const deleteMedCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_meditati", req.body.id);
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
exports.deleteMedCatById = deleteMedCatById;
const getOthers = async (req, res) => {
  const {
    id_cat,
    tag
  } = req.params;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await (0, _auth.check)(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const medCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_meditati"));
    medCats.forEach(doc => {
      if (doc.id !== id_cat) {
        data.push(_objectSpread({
          uid: doc.id
        }, doc.data()));
      }
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        // if (data[i].meditationRoutines.length > 0)
        if (data[i].meditationRoutines[j].tags.includes(tag)) {
          if (abonament != false && abonament != "") {
            data[i].meditationRoutines[j].isLocked = false;
          }
        } else {
          data[i].meditationRoutines.splice(j, 1);
          j--;
        }
      }
    }
    //console.log(abonament);
    // console.log(data);
    res.status(200).json({
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
exports.getOthers = getOthers;
const getOthers2 = async (req, res) => {
  const {
    id
  } = req.params;
  let final;
  const data = [];
  // let abonament = "";
  // try {
  //   const [decodedToken, userId, userObj] = await check(req);
  //   abonament = userObj.abonament;
  //   if (!abonament || abonament === "") {
  //     return res.status(403).json({ error: "Premium required" });
  //   }
  // } catch (error) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  try {
    const medCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_meditati"));
    medCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        if (data[i].meditationRoutines[j].id == id) {
          data[i].meditationRoutines[j].isLocked = false;
          final = data[i].meditationRoutines[j];
          break;
        } else {
          data[i].meditationRoutines.splice(j, 1);
          j--;
        }
      }
    }
    res.status(200).json({
      data: _objectSpread({}, final)
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};

// id categorie si tag
// => sa nu aiba id categorie

// => [
// {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// {nume categorie, meditationroutines:[toate cu tagul respectiv]}
// ]
//
//
//
exports.getOthers2 = getOthers2;