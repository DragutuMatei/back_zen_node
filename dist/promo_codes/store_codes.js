"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreCodesStats = exports.addStoreCodes = void 0;
var _config_fire = require("../../config_fire.js");
var _firestore = require("firebase/firestore");
const addStoreCodes = async (req, res) => {
  try {
    const {
      alias,
      platform,
      codes,
      expiresAt
    } = req.body;
    if (!alias || !platform || !codes || !Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Date invalide"
      });
    }
    const batch = (0, _firestore.writeBatch)(_config_fire.db);
    const storeCodesRef = (0, _firestore.collection)(_config_fire.db, "store_promo_codes");
    for (const code of codes) {
      if (code.trim() !== "") {
        const newDocRef = (0, _firestore.doc)(storeCodesRef);
        batch.set(newDocRef, {
          alias: alias.toLowerCase().trim(),
          platform: platform.toLowerCase().trim(),
          code: code.trim(),
          isUsed: false,
          usedByEmail: null,
          usedAt: null,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
          createdAt: new Date().toISOString()
        });
      }
    }
    await batch.commit();
    res.status(200).json({
      ok: true,
      message: `${codes.length} coduri adăugate cu succes.`
    });
  } catch (error) {
    console.error("Eroare la adaugarea store codes:", error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
exports.addStoreCodes = addStoreCodes;
const getStoreCodesStats = async (req, res) => {
  try {
    const q = (0, _firestore.query)((0, _firestore.collection)(_config_fire.db, "store_promo_codes"));
    const snapshot = await (0, _firestore.getDocs)(q);
    const stats = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const key = `${data.alias}_${data.platform}`;
      if (!stats[key]) {
        stats[key] = {
          alias: data.alias,
          platform: data.platform,
          total: 0,
          used: 0,
          expiresAt: data.expiresAt,
          createdAt: data.createdAt
        };
      }
      stats[key].total += 1;
      if (data.isUsed) {
        stats[key].used += 1;
      }
      // Păstrăm cea mai recentă dată (aproximativ)
      if (new Date(data.createdAt) > new Date(stats[key].createdAt)) {
        stats[key].createdAt = data.createdAt;
      }
    });
    const dataArray = Object.values(stats);
    dataArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({
      ok: true,
      data: dataArray
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
exports.getStoreCodesStats = getStoreCodesStats;