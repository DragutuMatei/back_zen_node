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
import { check } from "../auth/auth";

const getIt = async (req, colection, routines, title,link, isBig, isOrderd) => {
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
        if (
          i < 7
          // todo: for production
          // && !e.isLocked
        ) {
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

const getHome = async (req, res) => {
  const meditations_data = await getIt(
    req,
    "categorie_meditati",
    "meditationRoutines",
    "Colectii de meditatii",
    'meditationLink',
    true,
    false
  );
  const listens_data = await getIt(
    req,
    "categorie_listen",
    "listenRoutines",
    "Colectii de sunete",
    'listenLink',
    true,
    false
  );
  const last_meditations = await getIt(
    req,
    "categorie_meditati",
    "meditationRoutines",
    "Ultimile meditatii",
    'meditationLink',
    false,
    true
  );
  const last_listens = await getIt(
    req,
    "categorie_listen",
    "listenRoutines",
    "Ultimile sunete ascultate",
    'listenLink',
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
