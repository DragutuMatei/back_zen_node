"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPromoCode = exports.updatePromoCode = exports.trackPromoCodeActivation = exports.getAllPromoCodes = exports.deletePromoCode = exports.addPromoCode = void 0;
var _config_fire = require("../../config_fire.js");
var _firestore = require("firebase/firestore");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const addPromoCode = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      validFrom,
      validTo,
      active
    } = req.body;
    const data = {
      code: code.toLowerCase().trim(),
      discountPercentage: parseInt(discountPercentage),
      validFrom,
      validTo,
      active: active !== undefined ? active : true,
      activationsCount: 0,
      activatedBy: [],
      createdAt: new Date().toISOString()
    };
    const document = await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "discount_codes"), data);
    res.status(200).json(_objectSpread({
      ok: true,
      id: document.id
    }, data));
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.addPromoCode = addPromoCode;
const getAllPromoCodes = async (req, res) => {
  try {
    const q = (0, _firestore.query)((0, _firestore.collection)(_config_fire.db, "discount_codes"));
    const snapshot = await (0, _firestore.getDocs)(q);
    const data = [];
    snapshot.forEach(doc => {
      data.push(_objectSpread({
        id: doc.id
      }, doc.data()));
    });
    // sort locally by createdAt desc
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
exports.getAllPromoCodes = getAllPromoCodes;
const updatePromoCode = async (req, res) => {
  try {
    const {
      id,
      code,
      discountPercentage,
      validFrom,
      validTo,
      active
    } = req.body;
    const ref = (0, _firestore.doc)(_config_fire.db, "discount_codes", id);
    const updateData = {};
    if (code !== undefined) updateData.code = code.toLowerCase().trim();
    if (discountPercentage !== undefined) updateData.discountPercentage = parseInt(discountPercentage);
    if (validFrom !== undefined) updateData.validFrom = validFrom;
    if (validTo !== undefined) updateData.validTo = validTo;
    if (active !== undefined) updateData.active = active;
    await (0, _firestore.updateDoc)(ref, updateData);
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.updatePromoCode = updatePromoCode;
const deletePromoCode = async (req, res) => {
  try {
    const ref = (0, _firestore.doc)(_config_fire.db, "discount_codes", req.body.id);
    await (0, _firestore.deleteDoc)(ref);
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.deletePromoCode = deletePromoCode;
const verifyPromoCode = async (req, res) => {
  try {
    const {
      code,
      platform,
      email
    } = req.body;
    if (!code) {
      return res.status(200).json({
        ok: false,
        error: "Introdu un cod invalid"
      });
    }

    // 1. Verificam intai in discount_codes
    const q1 = (0, _firestore.query)((0, _firestore.collection)(_config_fire.db, "discount_codes"), (0, _firestore.where)("code", "==", code.toLowerCase().trim()));
    const snapshot1 = await (0, _firestore.getDocs)(q1);
    if (!snapshot1.empty) {
      let promo = snapshot1.docs[0].data();
      if (promo.active === false) {
        return res.status(200).json({
          ok: false,
          error: "Cod inactiv"
        });
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const fromDate = new Date(promo.validFrom);
      const toDate = new Date(promo.validTo);
      if (today < fromDate || today > toDate) {
        return res.status(200).json({
          ok: false,
          error: "Cod expirat"
        });
      }
      return res.status(200).json({
        ok: true,
        discountPercentage: promo.discountPercentage
      });
    }

    // 2. Daca nu gasim procent, cautam in store_promo_codes
    if (!platform) {
      return res.status(200).json({
        ok: false,
        error: "Cod invalid"
      });
    }
    const q2 = (0, _firestore.query)((0, _firestore.collection)(_config_fire.db, "store_promo_codes"), (0, _firestore.where)("alias", "==", code.toLowerCase().trim()), (0, _firestore.where)("platform", "==", platform.toLowerCase().trim()), (0, _firestore.where)("isUsed", "==", false));
    const snapshot2 = await (0, _firestore.getDocs)(q2);
    if (snapshot2.empty) {
      return res.status(200).json({
        ok: false,
        error: "Cod invalid sau epuizat"
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Gasim primul document valabil
    let validDoc = null;
    let storeCodeData = null;
    for (const d of snapshot2.docs) {
      const data = d.data();
      if (data.expiresAt) {
        const expDate = new Date(data.expiresAt);
        if (today > expDate) {
          continue; // Acest cod a expirat (timestamp-ul limită e depășit)
        }
      }
      validDoc = d;
      storeCodeData = data;
      break;
    }
    if (!validDoc) {
      return res.status(200).json({
        ok: false,
        error: "Campanie expirată"
      });
    }

    // Il marcam direct ca folosit
    const ref = validDoc.ref;
    await (0, _firestore.updateDoc)(ref, {
      isUsed: true,
      usedByEmail: email || "necunoscut",
      usedAt: new Date().toISOString()
    });
    return res.status(200).json({
      ok: true,
      isStoreCode: true,
      platform: storeCodeData.platform,
      storeCode: storeCodeData.code
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.verifyPromoCode = verifyPromoCode;
const trackPromoCodeActivation = async (req, res) => {
  try {
    const {
      code,
      email
    } = req.body;
    if (!code || !email) {
      return res.status(200).json({
        ok: false
      });
    }
    const q = (0, _firestore.query)((0, _firestore.collection)(_config_fire.db, "discount_codes"), (0, _firestore.where)("code", "==", code.toLowerCase().trim()));
    const snapshot = await (0, _firestore.getDocs)(q);
    if (snapshot.empty) {
      return res.status(200).json({
        ok: false
      });
    }
    const docSnap = snapshot.docs[0];
    const promo = docSnap.data();
    const activatedByList = promo.activatedBy || [];
    let newCount = promo.activationsCount || 0;
    if (!activatedByList.includes(email)) {
      activatedByList.push(email);
      newCount++;
    }
    const ref = (0, _firestore.doc)(_config_fire.db, "discount_codes", docSnap.id);
    await (0, _firestore.updateDoc)(ref, {
      activationsCount: newCount,
      activatedBy: activatedByList
    });
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
};
exports.trackPromoCodeActivation = trackPromoCodeActivation;