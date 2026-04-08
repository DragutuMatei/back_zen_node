import { db } from "../../config_fire.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc
} from "firebase/firestore";

const addStoreCodes = async (req, res) => {
  try {
    const { alias, platform, codes, expiresAt } = req.body;
    
    if (!alias || !platform || !codes || !Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ ok: false, error: "Date invalide" });
    }

    const batch = writeBatch(db);
    const storeCodesRef = collection(db, "store_promo_codes");

    for (const code of codes) {
      if (code.trim() !== "") {
        const newDocRef = doc(storeCodesRef);
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

    res.status(200).json({ ok: true, message: `${codes.length} coduri adăugate cu succes.` });
  } catch (error) {
    console.error("Eroare la adaugarea store codes:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getStoreCodesStats = async (req, res) => {
  try {
    const q = query(collection(db, "store_promo_codes"));
    const snapshot = await getDocs(q);
    
    const stats = {};
    
    snapshot.forEach((doc) => {
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
    dataArray.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ ok: true, data: dataArray });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export {
  addStoreCodes,
  getStoreCodesStats
};
