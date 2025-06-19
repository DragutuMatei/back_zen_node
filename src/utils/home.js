import { db, storage } from "../../config_fire.js";
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
import { check } from "../auth/auth.js";

const getIt = async (
  req,
  colection,
  routines,
  title,
  link,
  free,
  isBig,
  isOrderd,
  limit = 0
) => {
  try {
    const cats = await getDocs(collection(db, colection));
    let abonament = "";
    try {
      const [decodedToken, userId, user] = await check(req);
      abonament = user.abonament;
    } catch (error) {
      abonament = false;
    }
    let items = [];
    let i = 0;
    cats.forEach((doc) => {
      doc.data()[routines].map((e) => {
        if (free) {
          if (
            // todo: for production
            !e.isLocked
          ) {
            items.push({
              title: e.title,
              background: e.background,
              linkTo: e[link],
              linkInfo: null,
              totalTime: Number(e.duration),
              isLocked: false,
              time: e.time,
            });
          }
        } else {
          if (i < limit)
            items.push({
              title: e.title,
              background: e.background,
              linkTo: e[link],
              linkInfo: null,
              totalTime: Number(e.duration),
              isLocked:
                abonament != false && abonament != "" ? false : e.isLocked,
              time: e.time,
            });
        }
        i++;
      });
    });
    if (isOrderd) {
      items = items.sort((a, b) => b.time - a.time);
    }

    // if (abonament != false && abonament != "") {
    //   for (let i = 0; i < items.length; i++) {
    //     for (let j = 0; j < items[i][routines].length; j++) {
    //       items[i][routines][j].isLocked = false;
    //     }
    //   }
    // }

    return {
      title: title,
      isBig: isBig,
      items: items,
    };
  } catch (error) {
    return false;
  }
};

const getCat = async (cat, title, isBig) => {
  try {
    let data = [];

    const medCats = await getDocs(
      collection(db, cat),
      orderBy("order", "desc")
    );
    let index = 0;
    medCats.forEach((doc, index) => {
      // if (index < limit) {
      const el = doc.data();
      data.push({
        title: el.categoryTitle,
        background: el.backgroundImage,
        linkTo:
          cat === "categorie_meditati" ? "/meditation/item" : "/listen/item",
        linkInfo: null,
        totalTime:
          el[
            cat === "categorie_meditati"
              ? "meditationRoutines"
              : "listenRoutines"
          ].length,
        isLocked: false,
        // time:
      });
      // data.push({ uid: doc.id, ...doc.data() });
      // } else return;
      index++;
    });

    return {
      title: title,
      isBig: isBig,
      data: data,
    };
  } catch (error) {
    return false;
  }
};

const getHome = async (req, res) => {
  const free_meditations = await getIt(
    req,
    "categorie_meditati",
    "meditationRoutines",
    "Ascultă gratuit",
    "meditationLink",
    true,
    false,
    false
  );
  const last_meditations = await getIt(
    req,
    "categorie_meditati",
    "meditationRoutines",
    "Recent adăugate",
    "meditationLink",
    false,
    false,
    true,
    5
  );
  const last_listens = await getIt(
    req,
    "categorie_listen",
    "listenRoutines",
    "Recent adaugate",
    "listenLink",
    false,
    false,
    true,
    5
  );

  const med_cat = await getCat("categorie_meditati", "Colecții Meditații", true);
  const list_cat = await getCat("categorie_listen", "Colecții Sunete", true);


  const data = [
    med_cat != false && med_cat,
    free_meditations != false && free_meditations,
    last_meditations != false && last_meditations,
    list_cat != false && list_cat,
    last_listens != false && last_listens,
  ];

  if (data.length > 0) {
    res.status(200).json({ data });
  } else {
    res.status(500).json({ ok: false });
  }
};

export { getHome };
