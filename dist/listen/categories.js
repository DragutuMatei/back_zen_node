"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getbyid = exports.getListenCatByIdRaw = exports.getListenCatById = exports.getAllListenCats = exports.deleteListenCatById = exports.addListenCat = void 0;
exports.orderByField = orderByField;
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
// // const addListenCat = async (req, res) => {
// //   const data = {
// //     categoryTitle: req.body.categoryTitle,
// //     backgroundImage: "",
// //     order: req.body.order,
// //     listenRoutines: [],
// //   };
// //   try {
// //     const storageRef = ref(
// //       storage,
// //       `/listen/cat/${req.files["backgroundImage"].name}`
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
// //     const document = await addDoc(collection(db, "categorie_listen"), data);
// //     res.status(200).json({ ok: true, id: document.id });
// //   } catch (error) {
// //     //console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // const getAllListenCats = async (req, res) => {
// //   let data = [];
// //   let abonament = "";
// //   try {
// //     const [decodedToken, userId, user] = await check(req);
// //     abonament = user.abonament;
// //   } catch (error) {
// //     abonament = false;
// //   }
// //   try {
// //     const listenCats = await getDocs(
// //       collection(db, "categorie_listen"),
// //       orderBy("order", "desc")
// //     );
// //     listenCats.forEach((doc) => {
// //       data.push({ uid: doc.id, ...doc.data() });
// //     });
// //     data = orderByField(data, "order", false);
// //     console.log(abonament);
// //     if (abonament != false && abonament != "") {
// //       for (let i = 0; i < data.length; i++) {
// //         for (let j = 0; j < data[i].listenRoutines.length; j++) {
// //           data[i].listenRoutines[j].isLocked = false;
// //         }
// //       }
// //     }
// //     for (let i = 0; i < data.length; i++) {
// //       data[i].listenRoutines = orderByField(
// //         data[i].listenRoutines,
// //         "time",
// //         true
// //       );
// //       console.log(data[i].listenRoutines);
// //     }
// //     res.status(200).json({ ok: true, data });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ ok: false, error });
// //   }
// // };
// // const getListenCatById = async (req, res) => {
// //   const result = await getListenCatByIdRaw(req.params.id);
// //   if (result.ok) {
// //     res.status(200).json(result);
// //   } else {
// //     res.status(500).json(result);
// //   }
// // };
// // const getListenCatByIdRaw = async (id) => {
// //   try {
// //     const ref = doc(db, "categorie_listen", id);
// //     const listencat = await getDoc(ref);
// //     return { ok: true, data: { uid: listencat.id, ...listencat.data() } };
// //   } catch (error) {
// //     return { ok: false, error };
// //   }
// // };
// // const deleteListenCatById = async (req, res) => {
// //   try {
// //     //console.log(req.body);
// //     const ref = doc(db, "categorie_listen", req.body.id);
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
// // const getbyid = async (req, res) => {
// //   const { id } = req.params;
// //   console.log(id);
// //   let final;
// //   const data = [];
// //   let abonament = "";
// //   try {
// //     const [decodedToken, userId, user] = await check(req);
// //     abonament = user.abonament;
// //   } catch (error) {
// //     abonament = false;
// //   }
// //   try {
// //     const medCats = await getDocs(collection(db, "categorie_listen"));
// //     medCats.forEach((doc) => {
// //       data.push({ uid: doc.id, ...doc.data() });
// //     });
// //     for (let i = 0; i < data.length; i++) {
// //       for (let j = 0; j < data[i].listenRoutines.length; j++) {
// //         // if (data[i].listenRoutines.length > 0)
// //         if (data[i].listenRoutines[j].id == id) {
// //           if (abonament != false && abonament != "") {
// //             data[i].listenRoutines[j].isLocked = false;
// //           }
// //           final = data[i].listenRoutines[j];
// //           break;
// //         } else {
// //           data[i].listenRoutines.splice(j, 1);
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
// //   addListenCat,
// //   getAllListenCats,
// //   getListenCatById,
// //   deleteListenCatById,
// //   getbyid,
// //   getListenCatByIdRaw,
// //   orderByField,
// // };
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
// const addListenCat = async (req, res) => {
//   const data = {
//     categoryTitle: req.body.categoryTitle,
//     backgroundImage: "",
//     order: req.body.order,
//     listenRoutines: [],
//   };
//   try {
//     const storageRef = ref(
//       storage,
//       `/listen/cat/${req.files["backgroundImage"].name}`
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
//     const document = await addDoc(collection(db, "categorie_listen"), data);
//     res.status(200).json({ ok: true, id: document.id });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// const getAllListenCats = async (req, res) => {
//   let data = [];
//   let abonament = "";
//   let user = null;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
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
//     const listenCats = await getDocs(
//       collection(db, "categorie_listen"),
//       orderBy("order", "desc")
//     );
//     listenCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });
//     data = orderByField(data, "order", false);
//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].listenRoutines.length; j++) {
//         data[i].listenRoutines[j].isLocked = abonament
//           ? false
//           : data[i].listenRoutines[j].isLocked;
//       }
//     }
//     for (let i = 0; i < data.length; i++) {
//       data[i].listenRoutines = orderByField(
//         data[i].listenRoutines,
//         "time",
//         true
//       );
//     }
//     res.status(200).json({ ok: true, data });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };
// const getListenCatById = async (req, res) => {
//   const result = await getListenCatByIdRaw(req.params.id);
//   if (result.ok) {
//     res.status(200).json(result);
//   } else {
//     res.status(500).json(result);
//   }
// };
// const getListenCatByIdRaw = async (id) => {
//   try {
//     const ref = doc(db, "categorie_listen", id);
//     const listencat = await getDoc(ref);
//     return { ok: true, data: { uid: listencat.id, ...listencat.data() } };
//   } catch (error) {
//     return { ok: false, error };
//   }
// };
// const deleteListenCatById = async (req, res) => {
//   try {
//     //console.log(req.body);
//     const ref = doc(db, "categorie_listen", req.body.id);
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
// const getbyid = async (req, res) => {
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
//     const medCats = await getDocs(collection(db, "categorie_listen"));
//     medCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });
//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].listenRoutines.length; j++) {
//         if (data[i].listenRoutines[j].id == id) {
//           data[i].listenRoutines[j].isLocked = false;
//           final = data[i].listenRoutines[j];
//           break;
//         } else {
//           data[i].listenRoutines.splice(j, 1);
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
//   addListenCat,
//   getAllListenCats,
//   getListenCatById,
//   deleteListenCatById,
//   getbyid,
//   getListenCatByIdRaw,
//   orderByField,
// };
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
    const listenCats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, "categorie_listen"), (0, _firestore.orderBy)("order", "desc"));
    listenCats.forEach(doc => {
      data.push(_objectSpread({
        uid: doc.id
      }, doc.data()));
    });
    data = orderByField(data, "order", false);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].listenRoutines.length; j++) {
        data[i].listenRoutines[j].isLocked = abonament ? false : data[i].listenRoutines[j].isLocked;
      }
    }
    for (let i = 0; i < data.length; i++) {
      data[i].listenRoutines = orderByField(data[i].listenRoutines, "time", true);
    }
    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.getAllListenCats = getAllListenCats;
const getListenCatById = async (req, res) => {
  const result = await getListenCatByIdRaw(req.params.id);
  if (result.ok) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
exports.getListenCatById = getListenCatById;
const getListenCatByIdRaw = async id => {
  try {
    const ref = (0, _firestore.doc)(_config_fire.db, "categorie_listen", id);
    const listencat = await (0, _firestore.getDoc)(ref);
    return {
      ok: true,
      data: _objectSpread({
        uid: listencat.id
      }, listencat.data())
    };
  } catch (error) {
    return {
      ok: false,
      error
    };
  }
};
exports.getListenCatByIdRaw = getListenCatByIdRaw;
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
  let final;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, userObj] = await (0, _auth.check)(req);
    abonament = userObj.abonament;
    if (!abonament || abonament === "") {
      return res.status(403).json({
        error: "Premium required"
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized"
    });
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
        if (data[i].listenRoutines[j].id == id) {
          data[i].listenRoutines[j].isLocked = false;
          final = data[i].listenRoutines[j];
          break;
        } else {
          data[i].listenRoutines.splice(j, 1);
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
exports.getbyid = getbyid;