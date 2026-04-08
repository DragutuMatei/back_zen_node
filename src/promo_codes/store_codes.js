import { db } from "../../config_fire.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  deleteDoc
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
      const key = data.alias;
      
      if (!stats[key]) {
        stats[key] = {
          alias: data.alias,
          platforms: new Set(),
          total: 0,
          used: 0,
          expiresAt: data.expiresAt,
          createdAt: data.createdAt
        };
      }
      
      stats[key].total += 1;
      stats[key].platforms.add(data.platform);
      if (data.isUsed) {
        stats[key].used += 1;
      }
      if (new Date(data.createdAt) > new Date(stats[key].createdAt)) {
        stats[key].createdAt = data.createdAt;
      }
      // Preluăm expiresAt
      if (data.expiresAt) {
         stats[key].expiresAt = data.expiresAt;
      }
    });

    const dataArray = Object.values(stats).map(item => {
      return {
        ...item,
         platforms: Array.from(item.platforms).join(', ')
      };
    });
    
    dataArray.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ ok: true, data: dataArray });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteStoreCodes = async (req, res) => {
  try {
    const { alias } = req.body;
    if (!alias) {
      return res.status(400).json({ ok: false, error: "Date invalide" });
    }

    const q = query(
      collection(db, "store_promo_codes"),
      where("alias", "==", alias)
    );
    
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    await batch.commit();

    res.status(200).json({ ok: true, message: "Campania a fost ștearsă cu succes." });
  } catch (error) {
    console.error("Eroare la ștergerea codurilor:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const updateStoreCodes = async (req, res) => {
  try {
    const { alias, expiresAt } = req.body;
    if (!alias) {
      return res.status(400).json({ ok: false, error: "Lipseste alias" });
    }

    const q = query(collection(db, "store_promo_codes"), where("alias", "==", alias));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);

    const expiresIso = expiresAt ? new Date(expiresAt).toISOString() : null;

    snapshot.forEach((docSnap) => {
      batch.update(docSnap.ref, { expiresAt: expiresIso });
    });

    await batch.commit();
    res.status(200).json({ ok: true, message: "Campanie actualizata cu succes." });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getRawStoreCodes = async (req, res) => {
  try {
    const { alias } = req.body;
    if (!alias) {
      return res.status(400).json({ ok: false, error: "Lipseste alias" });
    }
    const q = query(
      collection(db, "store_promo_codes"),
      where("alias", "==", alias)
    );
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((docSnap) => {
      data.push({ id: docSnap.id, ...docSnap.data() });
    });
    
    // Sortate newest to oldest in UI if needed, we'll sort here descending by created at
    data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteSingleStoreCode = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.status(400).json({ ok: false, error: "Lipseste id-ul" });
    }
    const docRef = doc(db, "store_promo_codes", docId);
    await deleteDoc(docRef);
    res.status(200).json({ ok: true, message: "Codul a fost șters." });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export {
  addStoreCodes,
  getStoreCodesStats,
  deleteStoreCodes,
  updateStoreCodes,
  getRawStoreCodes,
  deleteSingleStoreCode
};
