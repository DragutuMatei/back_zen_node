import { db, storage } from "../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const getIt = async (colection, routines, title, isBig, isOrderd) => {
  try {
    const cats = await getDocs(collection(db, colection));

    let items = [];
    let i = 0;
    cats.forEach((doc) => {
      doc.data()[routines].map((e) => {
        if (
          i < 7
          // todo: for production
          // && !e.isLocked
        ) {
          items.push({
            title: e.title,
            background: e.background,
            linkTo: "/player",
            linkInfo: null,
            totalTime: Number(e.duration),
            isLocked: e.isLocked,
            time: e.time,
          });
        }
        i++;
      });
    });
    if (isOrderd) {
      items = items.sort((a, b) => b.time - a.time);
    }

    return {
      title: title,
      isBig: isBig,
      items: items,
    };
  } catch (error) {
    return false;
  }
};

const getHome = async (req, res) => {
  const meditations_data = await getIt(
    "categorie_meditati",
    "meditationRoutines",
    "Colectii de meditatii",
    true,
    false
  );
  const listens_data = await getIt(
    "categorie_listen",
    "listenRoutines",
    "Colectii de sunete",
    true,
    false
  );
  const last_meditations = await getIt(
    "categorie_meditati",
    "meditationRoutines",
    "Ultimile meditatii",
    false,
    true
  );
  const last_listens = await getIt(
    "categorie_listen",
    "listenRoutines",
    "Ultimile sunete ascultate",
    false,
    true
  );

  const data = [
    meditations_data != false && meditations_data,
    last_meditations != false && last_meditations,
    listens_data != false && listens_data,
    last_listens != false && last_listens,
  ];

  if (data.length > 0) {
    res.status(200).json({ data });
  } else {
    res.status(500).json({ ok: false });
  }
};

export { getHome };
