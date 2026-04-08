import { db } from "../../config_fire.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc
} from "firebase/firestore";

const addPromoCode = async (req, res) => {
  try {
    const { code, discountPercentage, validFrom, validTo, active } = req.body;
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
    const document = await addDoc(collection(db, "discount_codes"), data);
    res.status(200).json({ ok: true, id: document.id, ...data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getAllPromoCodes = async (req, res) => {
  try {
    const q = query(collection(db, "discount_codes"));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    // sort locally by createdAt desc
    data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
}

const updatePromoCode = async (req, res) => {
  try {
    const { id, code, discountPercentage, validFrom, validTo, active } = req.body;
    const ref = doc(db, "discount_codes", id);
    const updateData = {};
    if (code !== undefined) updateData.code = code.toLowerCase().trim();
    if (discountPercentage !== undefined) updateData.discountPercentage = parseInt(discountPercentage);
    if (validFrom !== undefined) updateData.validFrom = validFrom;
    if (validTo !== undefined) updateData.validTo = validTo;
    if (active !== undefined) updateData.active = active;
    
    await updateDoc(ref, updateData);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
}

const deletePromoCode = async (req, res) => {
  try {
    const ref = doc(db, "discount_codes", req.body.id);
    await deleteDoc(ref);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const verifyPromoCode = async (req, res) => {
  try {
    const { code, platform, email } = req.body;
    if (!code) {
      return res.status(200).json({ ok: false, error: "Introdu un cod invalid" });
    }
    
    // 1. Verificam intai in discount_codes
    const q1 = query(collection(db, "discount_codes"), where("code", "==", code.toLowerCase().trim()));
    const snapshot1 = await getDocs(q1);
    
    if(!snapshot1.empty) {
      let promo = snapshot1.docs[0].data();
      if(promo.active === false) {
        return res.status(200).json({ ok: false, error: "Cod inactiv" });
      }
      const today = new Date();
      today.setHours(0,0,0,0);
      const fromDate = new Date(promo.validFrom);
      const toDate = new Date(promo.validTo);
      if(today < fromDate || today > toDate) {
        return res.status(200).json({ ok: false, error: "Cod expirat" });
      }
      return res.status(200).json({ ok: true, discountPercentage: promo.discountPercentage });
    }

    // 2. Daca nu gasim procent, cautam in store_promo_codes
    if (!platform) {
      return res.status(200).json({ ok: false, error: "Cod invalid" });
    }

    const q2 = query(
      collection(db, "store_promo_codes"), 
      where("alias", "==", code.toLowerCase().trim()),
      where("platform", "==", platform.toLowerCase().trim()),
      where("isUsed", "==", false)
    );
    const snapshot2 = await getDocs(q2);

    if (snapshot2.empty) {
        return res.status(200).json({ ok: false, error: "Cod invalid sau epuizat" });
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    
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
      return res.status(200).json({ ok: false, error: "Campanie expirată" });
    }

    // Il marcam direct ca folosit
    const ref = validDoc.ref;
    await updateDoc(ref, {
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
    res.status(500).json({ ok: false, error });
  }
};

const trackPromoCodeActivation = async (req, res) => {
  try {
    const { code, email } = req.body;
    if (!code || !email) {
      return res.status(200).json({ ok: false });
    }
    const q = query(collection(db, "discount_codes"), where("code", "==", code.toLowerCase().trim()));
    const snapshot = await getDocs(q);
    
    if(snapshot.empty) {
      return res.status(200).json({ ok: false });
    }
    
    const docSnap = snapshot.docs[0];
    const promo = docSnap.data();
    
    const activatedByList = promo.activatedBy || [];
    let newCount = promo.activationsCount || 0;
    
    if(!activatedByList.includes(email)) {
      activatedByList.push(email);
      newCount++;
    }
    
    const ref = doc(db, "discount_codes", docSnap.id);
    await updateDoc(ref, {
      activationsCount: newCount,
      activatedBy: activatedByList
    });
    
    res.status(200).json({ ok: true });
  } catch(error) {
    res.status(500).json({ ok: false, error });
  }
};

export {
  addPromoCode,
  getAllPromoCodes,
  updatePromoCode,
  deletePromoCode,
  verifyPromoCode,
  trackPromoCodeActivation
};
