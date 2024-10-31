"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHome = void 0;
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _uuid = require("uuid");
var _auth = require("../auth/auth");
const getIt = async (req, colection, routines, title, link, isBig, isOrderd) => {
  try {
    const cats = await (0, _firestore.getDocs)((0, _firestore.collection)(_config_fire.db, colection));
    let abonament = "";
    try {
      const [decodedToken, userId, user] = await (0, _auth.check)(req);
      abonament = user.abonament;
    } catch (error) {
      abonament = false;
    }
    console.log(abonament);
    let items = [];
    let i = 0;
    cats.forEach(doc => {
      doc.data()[routines].map(e => {
        if (i < 7
        // todo: for production
        // && !e.isLocked
        ) {
          items.push({
            title: e.title,
            background: e.background,
            linkTo: e[link],
            linkInfo: null,
            totalTime: Number(e.duration),
            isLocked: abonament != false && abonament != "" ? false : e.isLocked,
            time: e.time
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
      items: items
    };
  } catch (error) {
    return false;
  }
};
const getHome = async (req, res) => {
  const meditations_data = await getIt(req, "categorie_meditati", "meditationRoutines", "Colectii de meditatii", "meditationLink", true, false);
  const listens_data = await getIt(req, "categorie_listen", "listenRoutines", "Colectii de sunete", "listenLink", true, false);
  const last_meditations = await getIt(req, "categorie_meditati", "meditationRoutines", "Recent adaugate", "meditationLink", false, true);
  const last_listens = await getIt(req, "categorie_listen", "listenRoutines", "Recent adaugate", "listenLink", false, true);
  const data = [meditations_data != false && meditations_data, last_meditations != false && last_meditations, listens_data != false && listens_data, last_listens != false && last_listens];
  if (data.length > 0) {
    res.status(200).json({
      data
    });
  } else {
    res.status(500).json({
      ok: false
    });
  }
};
exports.getHome = getHome;