import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../config_fire.js";
import { check } from "../auth/auth.js";
import { getMedCatByIdRaw } from "../meditations/categories.js";
import { getListenCatByIdRaw } from "../listen/categories.js";

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
      meditationCategories: null,
      soundCategories: null,
    };
  } catch (error) {
    return false;
  }
};

const getInfos = async (cat, uid) => {
  let linkInfo = "";

  if (cat === "categorie_meditati") {
    linkInfo = await getMedCatByIdRaw(uid);
    linkInfo = linkInfo?.data?.meditationRoutines;
  } else {
    linkInfo = await getListenCatByIdRaw(uid);
    linkInfo = linkInfo?.data?.listenRoutines;
  }

  return linkInfo;
};

const getCat = async (cat, title, isBig, type) => {
  try {
    let data = [];

    const medCats = await getDocs(
      collection(db, cat),
      orderBy("order", "desc")
    );

    let index = 0;

    medCats.forEach(async (doc, index) => {
      const el = doc.data();
      const uid = doc.id;

      data.push({
        id: doc.id,
        order: el.order,
        title: el.categoryTitle,
        background: el.backgroundImage,
        linkTo:
          cat === "categorie_meditati" ? "/meditation/item" : "/listen/item",
        // linkInfo: await getInfos(cat, uid),
        totalTime:
          el[
            cat === "categorie_meditati"
              ? "meditationRoutines"
              : "listenRoutines"
          ].length,
        isLocked: false,
      });
    });

    data = data.sort((a, b) => b.order - a.order);

    for (const d of data) {
      const infos = await getInfos(cat, d.id);
      d.linkInfo = infos;
    }

    return {
      title: title,
      isBig: isBig,
      meditationCategories: cat === "categorie_meditati" ? data : null,
      soundCategories: cat === "categorie_listen" ? data : null,
      items: null,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getHome = async (req, res) => {
  const med_cat = await getCat(
    "categorie_meditati",
    "Colecții Meditații",
    true
  );
  const list_cat = await getCat("categorie_listen", "Colecții Sunete", true);
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
