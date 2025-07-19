// import { db, storage } from "../../config_fire.js";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   uploadBytes,
// } from "firebase/storage";
// import { v4 as uuid } from "uuid";
// import { check } from "../auth/auth.js";

// const addMedCat = async (req, res) => {
//   const data = {
//     categoryTitle: req.body.categoryTitle,
//     backgroundImage: "",
//     order: req.body.order,
//     meditationRoutines: [],
//   };
//   //console.log(req.files["backgroundImage"]);

//   try {
//     const storageRef = ref(
//       storage,
//       `/meditations/cat/${req.files["backgroundImage"].name}`
//     );
//     // var reader = new window.FileReader();
//     // reader.onload = function () {
//     //   var blob = window.dataURLtoBlob(reader.result);
//     // };

//     // reader.readAsDataURL(req.files["backgroundImage"]);

//     await uploadBytes(
//       storageRef,
//       req.files["backgroundImage"].data
//       // reader/
//     );

//     const url = await getDownloadURL(storageRef);
//     data["backgroundImage"] = url;
//     data["id"] = uuid();
//     const document = await addDoc(collection(db, "categorie_meditati"), data);
//     res.status(200).json({ ok: true, id: document.id });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// function orderByField(array, field, ascending = true) {
//   return array.sort((a, b) => {
//     if (a[field] < b[field]) {
//       return ascending ? -1 : 1;
//     }
//     if (a[field] > b[field]) {
//       return ascending ? 1 : -1;
//     }
//     return 0;
//   });
// }
// const getAllMedCats = async (req, res) => {
//   let data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//     console.log("Abonament1:", abonament);
//   } catch (error) {
//     abonament = false;
//     console.log("Abonament2:", abonament);
//   }
//   try {
//     const medCats = await getDocs(
//       collection(db, "categorie_meditati"),
//       orderBy("order", "desc")
//     );
//     medCats.forEach((doc) => {
//       console.log(doc.data().order);
//       data.push({ uid: doc.id, ...doc.data() });
//     });

//     data = orderByField(data, "order", false);
//     console.log(abonament);
//     if (abonament != false && abonament != "") {
//       for (let i = 0; i < data.length; i++) {
//         for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//           data[i].meditationRoutines[j].isLocked = false;
//         }
//         data[i].meditationRoutines = orderByField(
//           data[i].meditationRoutines,
//           "time",
//           true
//         );
//       }
//     }
//     for (let i = 0; i < data.length; i++) {
//       data[i].meditationRoutines = orderByField(
//         data[i].meditationRoutines,
//         "time",
//         true
//       );
//     }
//     // console.log("data: ", JSON.stringify(data));
//     res.status(200).json({ data });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getMedCatById = async (req, res) => {
//   const result = await getMedCatByIdRaw(req.params.id);
//   if (result.ok) {
//     res.status(200).json(result);
//   } else {
//     res.status(500).json(result);
//   }
// };
// const getMedCatByIdRaw = async (id) => {
//   try {
//     const ref = doc(db, "categorie_meditati", id);
//     const medcat = await getDoc(ref);
//     return { ok: true, data: { uid: medcat.id, ...medcat.data() } };
//   } catch (error) {
//     return { ok: false, error };
//   }
// };
// const deleteMedCatById = async (req, res) => {
//   try {
//     //console.log(req.body);
//     const ref = doc(db, "categorie_meditati", req.body.id);

//     deleteDoc(ref)
//       .then((r) => {
//         //console.log(r);
//         res.status(200).json({ ok: true });
//       })
//       .catch((error) => {
//         res.status(500).json({ ok: false, error });
//       });
//   } catch (error) {
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getOthers = async (req, res) => {
//   const { id_cat, tag } = req.params;
//   const data = [];
//   let abonament = "";
//   try {
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//   } catch (error) {
//     abonament = false;
//   }
//   try {
//     const medCats = await getDocs(collection(db, "categorie_meditati"));
//     medCats.forEach((doc) => {
//       if (doc.id !== id_cat) {
//         data.push({ uid: doc.id, ...doc.data() });
//       }
//     });

//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//         // if (data[i].meditationRoutines.length > 0)
//         if (data[i].meditationRoutines[j].tags.includes(tag)) {
//           if (abonament != false && abonament != "") {
//             data[i].meditationRoutines[j].isLocked = false;
//           }
//         } else {
//           data[i].meditationRoutines.splice(j, 1);
//           j--;
//         }
//       }
//     }
//     //console.log(abonament);
//     // console.log(data);
//     res.status(200).json({ data });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };

// const getOthers2 = async (req, res) => {
//   const { id } = req.params;
//   let final;
//   const data = [];
//   let abonament = "";
//   try {
//     console.log("CHECEEEECKKK");
//     const [decodedToken, userId, user] = await check(req);
//     abonament = user.abonament;
//   } catch (error) {
//     abonament = false;
//   }
//   try {
//     const medCats = await getDocs(collection(db, "categorie_meditati"));
//     medCats.forEach((doc) => {
//       data.push({ uid: doc.id, ...doc.data() });
//     });

//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < data[i].meditationRoutines.length; j++) {
//         // if (data[i].meditationRoutines.length > 0)
//         if (data[i].meditationRoutines[j].id == id) {
//           if (abonament != false && abonament != "") {
//             data[i].meditationRoutines[j].isLocked = false;
//           }
//           final = data[i].meditationRoutines[j];
//           break;
//         } else {
//           data[i].meditationRoutines.splice(j, 1);
//           j--;
//         }
//       }
//     }
//     //console.log(abonament);
//     // console.log(data);
//     console.log(final);
//     res.status(200).json({ data: { ...final } });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error });
//   }
// };
// export {
//   addMedCat,
//   getAllMedCats,
//   getMedCatByIdRaw,
//   getMedCatById,
//   deleteMedCatById,
//   getOthers,
//   getOthers2,
// };

// // id categorie si tag
// // => sa nu aiba id categorie

// // => [
// // {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// // {nume categorie, meditationroutines:[toate cu tagul respectiv]}
// // ]
// //
// //
// //
import { db, storage } from "../../config_fire.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
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

const addMedCat = async (req, res) => {
  const data = {
    categoryTitle: req.body.categoryTitle,
    backgroundImage: "",
    order: req.body.order,
    meditationRoutines: [],
  };
  //console.log(req.files["backgroundImage"]);

  try {
    const storageRef = ref(
      storage,
      `/meditations/cat/${req.files["backgroundImage"].name}`
    );
    // var reader = new window.FileReader();
    // reader.onload = function () {
    //   var blob = window.dataURLtoBlob(reader.result);
    // };

    // reader.readAsDataURL(req.files["backgroundImage"]);

    await uploadBytes(
      storageRef,
      req.files["backgroundImage"].data
      // reader/
    );

    const url = await getDownloadURL(storageRef);
    data["backgroundImage"] = url;
    data["id"] = uuid();
    const document = await addDoc(collection(db, "categorie_meditati"), data);
    res.status(200).json({ ok: true, id: document.id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};
function orderByField(array, field, ascending = true) {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return ascending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}
const getAllMedCats = async (req, res) => {
  let data = [];
  let abonament = "";
  let user = null;
  try {
    const [decodedToken, userId, userObj] = await check(req);
    abonament = userObj.abonament;
    user = userObj;
    if (!abonament || abonament === "") {
      return res.status(403).json({ error: "Premium required" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const medCats = await getDocs(
      collection(db, "categorie_meditati"),
      orderBy("order", "desc")
    );
    medCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    data = orderByField(data, "order", false);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        data[i].meditationRoutines[j].isLocked = false;
      }
      data[i].meditationRoutines = orderByField(
        data[i].meditationRoutines,
        "time",
        true
      );
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getMedCatById = async (req, res) => {
  const result = await getMedCatByIdRaw(req.params.id);
  if (result.ok) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const getMedCatByIdRaw = async (id) => {
  try {
    const ref = doc(db, "categorie_meditati", id);
    const medcat = await getDoc(ref);
    return { ok: true, data: { uid: medcat.id, ...medcat.data() } };
  } catch (error) {
    return { ok: false, error };
  }
};
const deleteMedCatById = async (req, res) => {
  try {
    //console.log(req.body);
    const ref = doc(db, "categorie_meditati", req.body.id);

    deleteDoc(ref)
      .then((r) => {
        //console.log(r);
        res.status(200).json({ ok: true });
      })
      .catch((error) => {
        res.status(500).json({ ok: false, error });
      });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

const getOthers = async (req, res) => {
  const { id_cat, tag } = req.params;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, user] = await check(req);
    abonament = user.abonament;
  } catch (error) {
    abonament = false;
  }
  try {
    const medCats = await getDocs(collection(db, "categorie_meditati"));
    medCats.forEach((doc) => {
      if (doc.id !== id_cat) {
        data.push({ uid: doc.id, ...doc.data() });
      }
    });

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        // if (data[i].meditationRoutines.length > 0)
        if (data[i].meditationRoutines[j].tags.includes(tag)) {
          if (abonament != false && abonament != "") {
            data[i].meditationRoutines[j].isLocked = false;
          }
        } else {
          data[i].meditationRoutines.splice(j, 1);
          j--;
        }
      }
    }
    //console.log(abonament);
    // console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getOthers2 = async (req, res) => {
  const { id } = req.params;
  let final;
  const data = [];
  let abonament = "";
  try {
    const [decodedToken, userId, userObj] = await check(req);
    abonament = userObj.abonament;
    if (!abonament || abonament === "") {
      return res.status(403).json({ error: "Premium required" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const medCats = await getDocs(collection(db, "categorie_meditati"));
    medCats.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].meditationRoutines.length; j++) {
        if (data[i].meditationRoutines[j].id == id) {
          data[i].meditationRoutines[j].isLocked = false;
          final = data[i].meditationRoutines[j];
          break;
        } else {
          data[i].meditationRoutines.splice(j, 1);
          j--;
        }
      }
    }
    res.status(200).json({ data: { ...final } });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};
export {
  addMedCat,
  getAllMedCats,
  getMedCatByIdRaw,
  getMedCatById,
  deleteMedCatById,
  getOthers,
  getOthers2,
};

// id categorie si tag
// => sa nu aiba id categorie

// => [
// {nume categorie, meditationroutines:[toate cu tagul respectiv]},
// {nume categorie, meditationroutines:[toate cu tagul respectiv]}
// ]
//
//
//
