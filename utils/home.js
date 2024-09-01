import { db, storage } from "../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
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

const getIt = async (colection, routines, title, isBig) => {
  try {
    const cats = await getDocs(collection(db, colection));

    const items = [];
    cats.forEach((doc, index) => {
      doc.data()[routines].map((e) => {
        if (items.length < 7)
          items.push({
            title: e.title,
            background: e.background,
            linkTo: "/player",
            linkInfo: null,
            totalTime: Number(e.duration),
            isLocked: e.isLocked,
          });
      });
    });

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
    true
  );
  const listens_data = await getIt(
    "categorie_listen",
    "listenRoutines",
    "Colectii de sunete",
    false
  );
  const yoga_data = await getIt(
    "categorie_yoga",
    "yogaRoutines",
    "Colectii de yoga",
    true
  );
  const podcast_data = await getIt(
    "categorie_podcast",
    "podcastRoutines",
    "Colectii de podcast",
    true
  );

  const data = [
    meditations_data != false && meditations_data,
    listens_data != false && listens_data,
    yoga_data != false && yoga_data,
    podcast_data != false && podcast_data,
  ];

  if (data.length > 0) {
    res.status(200).json({ data });
  } else {
    res.status(500).json({ ok: false });
  }
};

export { getHome };
