"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.updateUserStats = exports.register = exports.refreshToken = exports.logout = exports.login = exports.inside_user_stats = exports.getUserByEmail = exports.checkLogged = void 0;
exports.validateGooglePurchase = validateGooglePurchase;
exports.verifyApple = void 0;
var _config = _interopRequireDefault(require("./config.js"));
var _auth = require("firebase/auth");
var _config_fire = require("../../config_fire.js");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _axios = _interopRequireDefault(require("axios"));
var _googleapis = require("googleapis");
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // // import config from "./config.js";
// // import {
// //   createUserWithEmailAndPassword,
// //   sendEmailVerification,
// //   signInWithEmailAndPassword,
// //   signOut,
// // } from "firebase/auth";
// // import { auth, auth_admin, db, storage } from "../../config_fire.js";
// // import {
// //   addDoc,
// //   collection,
// //   doc,
// //   getDoc,
// //   getDocs,
// //   query,
// //   updateDoc,
// //   where,
// // } from "firebase/firestore";
// // import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // import axios from "axios";
// // import { google } from "googleapis";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // const register = async (req, res) => {
// //   const { email, password, platform } = req.body;
// //   if (!email || !password) {
// //     return res.status(422).json({
// //       email: "Email is required",
// //       password: "Password is required",
// //     });
// //   }
// //   createUserWithEmailAndPassword(auth, email, password)
// //     .then((userCredential) => {
// //       sendEmailVerification(auth.currentUser)
// //         .then(async () => {
// //           await addDoc(collection(db, "users"), {
// //             email: email,
// //             time: new Date().getTime() / 1000,
// //             med_time: 0,
// //             resp_time: 0,
// //             carduri_alese: 0,
// //             abonament: "",
// //             platform: platform,
// //             lasts: [],
// //             imgUrl: "",
// //           });
// //           res.status(201).json({
// //             message: "Verification email sent! User created successfully!",
// //           });
// //         })
// //         .catch((error) => {
// //           console.error(error);
// //           res.status(500).json({ error: "Error sending email verification" });
// //         });
// //     })
// //     .catch((error) => {
// //       const errorMessage =
// //         error.message || "An error occurred while registering user";
// //       res.status(500).json({ error: errorMessage });
// //     });
// // };
// // const login = async (req, res) => {
// //   res.header("Access-Control-Allow-Credentials", true);
// //   const { email, password } = req.body;
// //   if (!email || !password) {
// //     return res.status(422).json({
// //       email: "Email is required",
// //       password: "Password is required",
// //     });
// //   }
// //   signInWithEmailAndPassword(auth, email, password)
// //     .then((userCredential) => {
// //       const idToken = userCredential._tokenResponse.idToken;
// //       if (idToken) {
// //         res.cookie("accessToken", idToken, {
// //           httpOnly: true,
// //         });
// //         console.log("AICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", {
// //           accessToken: idToken,
// //           refreshToken: userCredential._tokenResponse.refreshToken,
// //         });
// //         res.status(200).json({
// //           accessToken: idToken,
// //           refreshToken: userCredential._tokenResponse.refreshToken,
// //         });
// //       } else {
// //         console.log("log error");
// //         res.status(500).json({ error: "Internal Server Error" });
// //       }
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       const errorMessage =
// //         error.message || "An error occurred while logging in";
// //       res.status(500).json({ error: errorMessage });
// //     });
// // };
// // async function check(req) {
// //   const authHeader = req.headers.authorization;
// //   // console.log("Auth Header:", authHeader);
// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return res.status(401).send({ error: "Unauthorized" });
// //   }
// //   const token = authHeader.split("Bearer ")[1]; // Extract the token
// //   try {
// //     // Verify the token using Firebase Admin SDK
// //     var decodedToken = await auth_admin.verifyIdToken(token);
// //     var userId = decodedToken.uid; // Get the user ID from the decoded token
// //     const email = decodedToken["email"];
// //     const user_ref = collection(db, "users");
// //     const q = query(user_ref, where("email", "==", email));
// //     var querySnapshot = await getDocs(q);
// //     // console.log("decode, userid, {id si  restul }: ", [
// //     //   decodedToken,
// //     //   userId,
// //     //   { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
// //     // ]);
// //     return [
// //       decodedToken,
// //       userId,
// //       { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
// //     ];
// //   } catch (error) {
// //     console.error("error:", error);
// //     return false;
// //     // res.status(500).send({ error: "Internal Server Error" });
// //   }
// // }
// // const checkLogged = async (req, res) => {
// //   // const user = auth.currentUser;
// //   // let ok = false;
// //   // if (user) ok = true;
// //   // res.status(200).json({ user });
// //   try {
// //     const [decodedToken, userId, data] = await check(req);
// //     // console.log({
// //     //   userId: userId,
// //     //   decodedToken: decodedToken["email"],
// //     //   data: { ...data },
// //     // });
// //     res.status(200).send({
// //       userId: userId,
// //       decodedToken: decodedToken["email"],
// //       data: { ...data },
// //     });
// //   } catch (error) {
// //     res.status(200).send({});
// //   }
// // };
// // const logout = async (req, res) => {
// //   signOut(auth)
// //     .then(() => {
// //       res.clearCookie("accessToken");
// //       res.status(200).json({ message: "User logged out successfully" });
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       res.status(500).json({ error: "Internal Server Error" });
// //     });
// // };
// // function getBase64ImageExtension(base64Image) {
// //   // Ensure base64 image is not empty
// //   if (!base64Image) {
// //     return null;
// //   }
// //   // Decode the first few characters of the base64 string
// //   const byteString = atob(base64Image.slice(0, 30)); // Decode the first 30 characters
// //   const magicNumbers = byteString
// //     .substr(0, 4)
// //     .split("")
// //     .map((c) => c.charCodeAt(0)); // Get the first 4 byte values
// //   // Check for magic numbers to determine the image format
// //   if (magicNumbers[0] === 0xff && magicNumbers[1] === 0xd8) {
// //     return "jpg"; // JPEG
// //   } else if (magicNumbers[0] === 0x89 && magicNumbers[1] === 0x50) {
// //     return "png"; // PNG
// //   } else if (magicNumbers[0] === 0x47 && magicNumbers[1] === 0x49) {
// //     return "gif"; // GIF
// //   } else if (magicNumbers[0] === 0x52 && magicNumbers[1] === 0x49) {
// //     return "tiff"; // TIFF
// //   } else if (magicNumbers[0] === 0x42 && magicNumbers[1] === 0x4d) {
// //     return "bmp"; // BMP
// //   } else if (
// //     magicNumbers[0] === 0x52 &&
// //     magicNumbers[1] === 0x49 &&
// //     magicNumbers[2] === 0x46 &&
// //     magicNumbers[3] === 0x38
// //   ) {
// //     return "webp"; // WEBP
// //   }
// //   return null; // Return null if format is unrecognized
// // }
// // const inside_user_stats = async (key, value, id) => {
// //   console.log("inside_user_stats", key, value, id);
// //   const user_ref = doc(db, "users", id);
// //   let user = await getDoc(user_ref);
// //   user = user.data();
// //   if (key === "med_time" || key === "carduri_alese" || key === "resp_time") {
// //     user[key] += Number(value);
// //     // value reprezinta minutele ascultate / cardurile alese
// //   } else if (key === "abonament") {
// //     user[key] = value;
// //   } else if (key === "imgUrl") {
// //     try {
// //       const byteString = atob(value);
// //       const arrayBuffer = new ArrayBuffer(byteString.length);
// //       const uint8Array = new Uint8Array(arrayBuffer);
// //       for (let i = 0; i < byteString.length; i++) {
// //         uint8Array[i] = byteString.charCodeAt(i);
// //       }
// //       const blob = new Blob([uint8Array], {
// //         type: `image/${getBase64ImageExtension(value)}`,
// //       });
// //       const storageRef = ref(
// //         storage,
// //         `/users/${id}-${user.email}.${getBase64ImageExtension(value)}`
// //       );
// //       await uploadBytes(storageRef, blob);
// //       const url = await getDownloadURL(storageRef);
// //       user["imgUrl"] = url;
// //     } catch (error) {
// //       console.log(error);
// //       return { ok: false, error: "pula mea coaie" };
// //     }
// //   } else if (key === "lasts") {
// //     console.log("pullllllllllllllllllllllllaaaaaaaaaaaa");
// //     user[key].unshift(value);
// //     const length = 3;
// //     if (user[key].length > length) {
// //       user[key].length = length;
// //     }
// //     console.log(user[key]);
// //     await updateDoc(user_ref, { lasts: user[key] });
// //   }
// //   await updateDoc(user_ref, user);
// //   return { ok: true };
// // };
// // const updateUserStats = async (req, res) => {
// //   const { key, value, id } = req.body;
// //   try {
// //     await inside_user_stats(key, value, id);
// //     res.status(200).json({ ok: true });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ ok: false, error: "plm" });
// //   }
// // };
// // const refreshToken = async (req, res) => {
// //   try {
// //     const response = await fetch(
// //       `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           grant_type: "refresh_token",
// //           refresh_token: req.body.refreshToken, // Pass the refresh token here
// //         }),
// //       }
// //     );
// //     // if (!response.ok) {
// //     //   throw new Error("Failed to refresh ID token");
// //     // }
// //     const data = await response.json();
// //     const newIdToken = data.id_token; // New ID token
// //     const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
// //     const expiresIn = data.expires_in; // Expiry time in seconds
// //     res
// //       .status(200)
// //       .json({ accessToken: newIdToken, refreshToken: newRefreshToken });
// //   } catch (error) {
// //     console.error("Error refreshing ID token:", error);
// //     res.status(500).json({ ok: false });
// //   }
// // };
// // const getUserByEmail = async (email) => {
// //   // try {
// //   //   const userRecord = await auth_admin.getUserByEmail(email);
// //   //   console.log(`Înregistrare Auth utilizator găsită: ${userRecord.uid}`);
// //   //   return { ...userRecord };
// //   // } catch (error) {
// //   //   if (error.code === "auth/user-not-found") {
// //   //     console.log(`Niciun utilizator Auth găsit cu emailul: ${email}`);
// //   //     return null;
// //   //   }
// //   //   console.error("Eroare la recuperarea înregistrării Auth:", error);
// //   //   throw error;
// //   // }
// //   const user_ref = collection(db, "users");
// //   const q = query(user_ref, where("email", "==", email));
// //   var querySnapshot = await getDocs(q);
// //   return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
// // };
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // // ⚙️ Config (înlocuiește cu ce ai nevoie)
// // const APPLE_SHARED_SECRET = "59acf87f515e4b5888714af93584ed07";
// // const GOOGLE_KEYFILE = path.join(__dirname, "django-2546a-047c18bcd59d.json");
// // const verifyApple = async (receiptData) => {
// //   const url = "https://buy.itunes.apple.com/verifyReceipt"; // sau sandbox
// //   const response = await axios.post(url, {
// //     "receipt-data": receiptData,
// //     password: APPLE_SHARED_SECRET,
// //     "exclude-old-transactions": true,
// //   });
// //   const data = response.data;
// //   if (data.status !== 0) {
// //     throw new Error(`Receipt invalid Apple (status ${data.status})`);
// //   }
// //   const latest = data.latest_receipt_info?.sort(
// //     (a, b) => Number(b.expires_date_ms) - Number(a.expires_date_ms)
// //   )[0];
// //   const isActive = latest && Number(latest.expires_date_ms) > Date.now();
// //   return {
// //     active: isActive,
// //     expiresAt: new Date(Number(latest.expires_date_ms)),
// //     transactionId: latest.original_transaction_id,
// //   };
// // };
// // async function validateGooglePurchase(productId, purchaseToken) {
// //   const auth = new google.auth.JWT({
// //     email: config.google.clientEmail,
// //     key: config.google.privateKey,
// //     scopes: ["https://www.googleapis.com/auth/androidpublisher"],
// //   });
// //   const androidPublisher = google.androidpublisher({
// //     version: "v3",
// //     auth,
// //   });
// //   try {
// //     const res = await androidPublisher.purchases.subscriptions.get({
// //       packageName: config.google.packageName,
// //       subscriptionId: productId,
// //       token: purchaseToken,
// //     });
// //     // ✅ Răspunsul conține statusul abonamentului
// //     const { expiryTimeMillis, autoRenewing, paymentState } = res.data;
// //     return {
// //       active: Number(expiryTimeMillis) > Date.now(),
// //       expiryDate: new Date(Number(expiryTimeMillis)),
// //       autoRenewing,
// //       paymentState,
// //     };
// //   } catch (err) {
// //     console.error("Google validation error:", err.message);
// //     return { active: false, error: err.message };
// //   }
// // }
// // export {
// //   check,
// //   getUserByEmail,
// //   validateGooglePurchase,
// //   verifyApple,
// //   login,
// //   logout,
// //   inside_user_stats,
// //   register,
// //   updateUserStats,
// //   checkLogged,
// //   refreshToken,
// // };
// import config from "./config.js";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth, auth_admin, db, storage } from "../../config_fire.js";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import axios from "axios";
// import { google } from "googleapis";
// import path from "path";
// import { fileURLToPath } from "url";
// const register = async (req, res) => {
//   const { email, password, platform } = req.body;
//   if (!email || !password) {
//     return res.status(422).json({
//       email: "Email is required",
//       password: "Password is required",
//     });
//   }
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       sendEmailVerification(auth.currentUser)
//         .then(async () => {
//           await addDoc(collection(db, "users"), {
//             email: email,
//             time: new Date().getTime() / 1000,
//             med_time: 0,
//             resp_time: 0,
//             carduri_alese: 0,
//             abonament: "",
//             platform: platform,
//             lasts: [],
//             imgUrl: "",
//           });
//           res.status(201).json({
//             message: "Verification email sent! User created successfully!",
//           });
//         })
//         .catch((error) => {
//           console.error(error);
//           res.status(500).json({ error: "Error sending email verification" });
//         });
//     })
//     .catch((error) => {
//       const errorMessage =
//         error.message || "An error occurred while registering user";
//       res.status(500).json({ error: errorMessage });
//     });
// };
// const login = async (req, res) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(422).json({
//       email: "Email is required",
//       password: "Password is required",
//     });
//   }
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const idToken = userCredential._tokenResponse.idToken;
//       if (idToken) {
//         res.cookie("accessToken", idToken, {
//           httpOnly: true,
//         });
//         console.log("AICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", {
//           accessToken: idToken,
//           refreshToken: userCredential._tokenResponse.refreshToken,
//         });
//         res.status(200).json({
//           accessToken: idToken,
//           refreshToken: userCredential._tokenResponse.refreshToken,
//         });
//       } else {
//         console.log("log error");
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       const errorMessage =
//         error.message || "An error occurred while logging in";
//       res.status(500).json({ error: errorMessage });
//     });
// };
// async function check(req) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("[AUTH] Missing or malformed Authorization header");
//     // return res.status(401).send({ error: "Unauthorized" });
//     return false;
//   }
//   const token = authHeader.split("Bearer ")[1]; // Extract the token
//   try {
//     // Verify the token using Firebase Admin SDK
//     var decodedToken = await auth_admin.verifyIdToken(token);
//     var userId = decodedToken.uid; // Get the user ID from the decoded token
//     const email = decodedToken["email"];
//     const user_ref = collection(db, "users");
//     const q = query(user_ref, where("email", "==", email));
//     var querySnapshot = await getDocs(q);
//     return [
//       decodedToken,
//       userId,
//       { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
//     ];
//   } catch (error) {
//     console.error("[AUTH] Token verification failed (expired/invalid):", error);
//     return false;
//   }
// }
// const checkLogged = async (req, res) => {
//   // const user = auth.currentUser;
//   // let ok = false;
//   // if (user) ok = true;
//   // res.status(200).json({ user });
//   try {
//     const [decodedToken, userId, data] = await check(req);
//     // console.log({
//     //   userId: userId,
//     //   decodedToken: decodedToken["email"],
//     //   data: { ...data },
//     // });
//     res.status(200).send({
//       userId: userId,
//       decodedToken: decodedToken["email"],
//       data: { ...data },
//     });
//   } catch (error) {
//     res.status(200).send({});
//   }
// };
// const logout = async (req, res) => {
//   signOut(auth)
//     .then(() => {
//       res.clearCookie("accessToken");
//       res.status(200).json({ message: "User logged out successfully" });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// };
// function getBase64ImageExtension(base64Image) {
//   // Ensure base64 image is not empty
//   if (!base64Image) {
//     return null;
//   }
//   // Decode the first few characters of the base64 string
//   const byteString = atob(base64Image.slice(0, 30)); // Decode the first 30 characters
//   const magicNumbers = byteString
//     .substr(0, 4)
//     .split("")
//     .map((c) => c.charCodeAt(0)); // Get the first 4 byte values
//   // Check for magic numbers to determine the image format
//   if (magicNumbers[0] === 0xff && magicNumbers[1] === 0xd8) {
//     return "jpg"; // JPEG
//   } else if (magicNumbers[0] === 0x89 && magicNumbers[1] === 0x50) {
//     return "png"; // PNG
//   } else if (magicNumbers[0] === 0x47 && magicNumbers[1] === 0x49) {
//     return "gif"; // GIF
//   } else if (magicNumbers[0] === 0x52 && magicNumbers[1] === 0x49) {
//     return "tiff"; // TIFF
//   } else if (magicNumbers[0] === 0x42 && magicNumbers[1] === 0x4d) {
//     return "bmp"; // BMP
//   } else if (
//     magicNumbers[0] === 0x52 &&
//     magicNumbers[1] === 0x49 &&
//     magicNumbers[2] === 0x46 &&
//     magicNumbers[3] === 0x38
//   ) {
//     return "webp"; // WEBP
//   }
//   return null; // Return null if format is unrecognized
// }
// const inside_user_stats = async (key, value, id) => {
//   console.log("inside_user_stats", key, value, id);
//   const user_ref = doc(db, "users", id);
//   let user = await getDoc(user_ref);
//   user = user.data();
//   if (key === "med_time" || key === "carduri_alese" || key === "resp_time") {
//     user[key] += Number(value);
//     // value reprezinta minutele ascultate / cardurile alese
//   } else if (key === "abonament") {
//     user[key] = value;
//   } else if (key === "imgUrl") {
//     try {
//       const byteString = atob(value);
//       const arrayBuffer = new ArrayBuffer(byteString.length);
//       const uint8Array = new Uint8Array(arrayBuffer);
//       for (let i = 0; i < byteString.length; i++) {
//         uint8Array[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([uint8Array], {
//         type: `image/${getBase64ImageExtension(value)}`,
//       });
//       const storageRef = ref(
//         storage,
//         `/users/${id}-${user.email}.${getBase64ImageExtension(value)}`
//       );
//       await uploadBytes(storageRef, blob);
//       const url = await getDownloadURL(storageRef);
//       user["imgUrl"] = url;
//     } catch (error) {
//       console.log(error);
//       return { ok: false, error: "pula mea coaie" };
//     }
//   } else if (key === "lasts") {
//     console.log("pullllllllllllllllllllllllaaaaaaaaaaaa");
//     user[key].unshift(value);
//     const length = 3;
//     if (user[key].length > length) {
//       user[key].length = length;
//     }
//     console.log(user[key]);
//     await updateDoc(user_ref, { lasts: user[key] });
//   }
//   await updateDoc(user_ref, user);
//   return { ok: true };
// };
// const updateUserStats = async (req, res) => {
//   const { key, value, id } = req.body;
//   try {
//     await inside_user_stats(key, value, id);
//     res.status(200).json({ ok: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, error: "plm" });
//   }
// };
// const refreshToken = async (req, res) => {
//   try {
//     const response = await fetch(
//       `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           grant_type: "refresh_token",
//           refresh_token: req.body.refreshToken, // Pass the refresh token here
//         }),
//       }
//     );
//     const data = await response.json();
//     if (!data.id_token || !data.refresh_token) {
//       console.error("[AUTH] Refresh token failed. Response:", data);
//       return res
//         .status(401)
//         .json({ ok: false, error: "Refresh token invalid or expired" });
//     }
//     const newIdToken = data.id_token; // New ID token
//     const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
//     const expiresIn = data.expires_in; // Expiry time in seconds
//     res
//       .status(200)
//       .json({ accessToken: newIdToken, refreshToken: newRefreshToken });
//   } catch (error) {
//     console.error("[AUTH] Error refreshing ID token:", error);
//     res.status(500).json({ ok: false });
//   }
// };
// const getUserByEmail = async (email) => {
//   // try {
//   //   const userRecord = await auth_admin.getUserByEmail(email);
//   //   console.log(`Înregistrare Auth utilizator găsită: ${userRecord.uid}`);
//   //   return { ...userRecord };
//   // } catch (error) {
//   //   if (error.code === "auth/user-not-found") {
//   //     console.log(`Niciun utilizator Auth găsit cu emailul: ${email}`);
//   //     return null;
//   //   }
//   //   console.error("Eroare la recuperarea înregistrării Auth:", error);
//   //   throw error;
//   // }
//   const user_ref = collection(db, "users");
//   const q = query(user_ref, where("email", "==", email));
//   var querySnapshot = await getDocs(q);
//   return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
// };
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // ⚙️ Config (înlocuiește cu ce ai nevoie)
// const APPLE_SHARED_SECRET = "59acf87f515e4b5888714af93584ed07";
// const GOOGLE_KEYFILE = path.join(__dirname, "django-2546a-047c18bcd59d.json");
// const verifyApple = async (receiptData) => {
//   const url = "https://buy.itunes.apple.com/verifyReceipt"; // sau sandbox
//   const response = await axios.post(url, {
//     "receipt-data": receiptData,
//     password: APPLE_SHARED_SECRET,
//     "exclude-old-transactions": true,
//   });
//   const data = response.data;
//   if (data.status !== 0) {
//     throw new Error(`Receipt invalid Apple (status ${data.status})`);
//   }
//   const latest = data.latest_receipt_info?.sort(
//     (a, b) => Number(b.expires_date_ms) - Number(a.expires_date_ms)
//   )[0];
//   const isActive = latest && Number(latest.expires_date_ms) > Date.now();
//   return {
//     active: isActive,
//     expiresAt: new Date(Number(latest.expires_date_ms)),
//     transactionId: latest.original_transaction_id,
//   };
// };
// async function validateGooglePurchase(productId, purchaseToken) {
//   const auth = new google.auth.JWT({
//     email: config.google.clientEmail,
//     key: config.google.privateKey,
//     scopes: ["https://www.googleapis.com/auth/androidpublisher"],
//   });
//   const androidPublisher = google.androidpublisher({
//     version: "v3",
//     auth,
//   });
//   try {
//     const res = await androidPublisher.purchases.subscriptions.get({
//       packageName: config.google.packageName,
//       subscriptionId: productId,
//       token: purchaseToken,
//     });
//     // ✅ Răspunsul conține statusul abonamentului
//     const { expiryTimeMillis, autoRenewing, paymentState } = res.data;
//     return {
//       active: Number(expiryTimeMillis) > Date.now(),
//       expiryDate: new Date(Number(expiryTimeMillis)),
//       autoRenewing,
//       paymentState,
//     };
//   } catch (err) {
//     console.error("Google validation error:", err.message);
//     return { active: false, error: err.message };
//   }
// }
// export {
//   check,
//   getUserByEmail,
//   validateGooglePurchase,
//   verifyApple,
//   login,
//   logout,
//   inside_user_stats,
//   register,
//   updateUserStats,
//   checkLogged,
//   refreshToken,
// };
const register = async (req, res) => {
  const {
    email,
    password,
    platform
  } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required"
    });
  }
  (0, _auth.createUserWithEmailAndPassword)(_config_fire.auth, email, password).then(userCredential => {
    (0, _auth.sendEmailVerification)(_config_fire.auth.currentUser).then(async () => {
      await (0, _firestore.addDoc)((0, _firestore.collection)(_config_fire.db, "users"), {
        email: email,
        time: new Date().getTime() / 1000,
        med_time: 0,
        resp_time: 0,
        carduri_alese: 0,
        abonament: "",
        platform: platform,
        lasts: [],
        imgUrl: ""
      });
      res.status(201).json({
        message: "Verification email sent! User created successfully!"
      });
    }).catch(error => {
      console.error(error);
      res.status(500).json({
        error: "Error sending email verification"
      });
    });
  }).catch(error => {
    const errorMessage = error.message || "An error occurred while registering user";
    res.status(500).json({
      error: errorMessage
    });
  });
};
exports.register = register;
const login = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required"
    });
  }
  (0, _auth.signInWithEmailAndPassword)(_config_fire.auth, email, password).then(userCredential => {
    const idToken = userCredential._tokenResponse.idToken;
    if (idToken) {
      res.cookie("accessToken", idToken, {
        httpOnly: true
      });
      console.log("AICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", {
        accessToken: idToken,
        refreshToken: userCredential._tokenResponse.refreshToken
      });
      res.status(200).json({
        accessToken: idToken,
        refreshToken: userCredential._tokenResponse.refreshToken
      });
    } else {
      console.log("log error");
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  }).catch(error => {
    console.error(error);
    const errorMessage = error.message || "An error occurred while logging in";
    res.status(500).json({
      error: errorMessage
    });
  });
};
exports.login = login;
async function check(req) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader, req.headers.authorization);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Nu loga, nu trimite răspuns HTTP, doar returnează false pentru user anonim
    return false;
  }
  try {
    // Verify the token using Firebase Admin SDK
    var decodedToken = await _config_fire.auth_admin.verifyIdToken(authHeader.split("Bearer ")[1]);
    var userId = decodedToken.uid; // Get the user ID from the decoded token
    const email = decodedToken["email"];
    const user_ref = (0, _firestore.collection)(_config_fire.db, "users");
    const q = (0, _firestore.query)(user_ref, (0, _firestore.where)("email", "==", email));
    var querySnapshot = await (0, _firestore.getDocs)(q);
    return [decodedToken, userId, _objectSpread({
      id: querySnapshot.docs[0].id
    }, querySnapshot.docs[0].data())];
  } catch (error) {
    console.error("[AUTH] Token verification failed (expired/invalid):", error);
    return false;
  }
}
const checkLogged = async (req, res) => {
  // const user = auth.currentUser;
  // let ok = false;
  // if (user) ok = true;
  // res.status(200).json({ user });
  try {
    const [decodedToken, userId, data] = await check(req);
    // console.log({
    //   userId: userId,
    //   decodedToken: decodedToken["email"],
    //   data: { ...data },
    // });
    res.status(200).send({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: _objectSpread({}, data)
    });
  } catch (error) {
    res.status(200).send({});
  }
};
exports.checkLogged = checkLogged;
const logout = async (req, res) => {
  (0, _auth.signOut)(_config_fire.auth).then(() => {
    res.clearCookie("accessToken");
    res.status(200).json({
      message: "User logged out successfully"
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  });
};
exports.logout = logout;
function getBase64ImageExtension(base64Image) {
  // Ensure base64 image is not empty
  if (!base64Image) {
    return null;
  }

  // Decode the first few characters of the base64 string
  const byteString = atob(base64Image.slice(0, 30)); // Decode the first 30 characters
  const magicNumbers = byteString.substr(0, 4).split("").map(c => c.charCodeAt(0)); // Get the first 4 byte values

  // Check for magic numbers to determine the image format
  if (magicNumbers[0] === 0xff && magicNumbers[1] === 0xd8) {
    return "jpg"; // JPEG
  } else if (magicNumbers[0] === 0x89 && magicNumbers[1] === 0x50) {
    return "png"; // PNG
  } else if (magicNumbers[0] === 0x47 && magicNumbers[1] === 0x49) {
    return "gif"; // GIF
  } else if (magicNumbers[0] === 0x52 && magicNumbers[1] === 0x49) {
    return "tiff"; // TIFF
  } else if (magicNumbers[0] === 0x42 && magicNumbers[1] === 0x4d) {
    return "bmp"; // BMP
  } else if (magicNumbers[0] === 0x52 && magicNumbers[1] === 0x49 && magicNumbers[2] === 0x46 && magicNumbers[3] === 0x38) {
    return "webp"; // WEBP
  }
  return null; // Return null if format is unrecognized
}
const inside_user_stats = async (key, value, id) => {
  console.log("inside_user_stats", key, value, id);
  const user_ref = (0, _firestore.doc)(_config_fire.db, "users", id);
  let user = await (0, _firestore.getDoc)(user_ref);
  user = user.data();
  if (key === "med_time" || key === "carduri_alese" || key === "resp_time") {
    user[key] += Number(value);
    // value reprezinta minutele ascultate / cardurile alese
  } else if (key === "abonament") {
    user[key] = value;
  } else if (key === "imgUrl") {
    try {
      const byteString = atob(value);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], {
        type: `image/${getBase64ImageExtension(value)}`
      });
      const storageRef = (0, _storage.ref)(_config_fire.storage, `/users/${id}-${user.email}.${getBase64ImageExtension(value)}`);
      await (0, _storage.uploadBytes)(storageRef, blob);
      const url = await (0, _storage.getDownloadURL)(storageRef);
      user["imgUrl"] = url;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "pula mea coaie"
      };
    }
  } else if (key === "lasts") {
    console.log("📌 Adăugare în 'lasts'");

    // Inițializare în caz că nu există
    if (!Array.isArray(user[key])) {
      user[key] = [];
    }
    const newItem = Object.values(value || {})[0] || null;

    // Dacă item-ul este invalid sau nu are id, îl ignorăm
    if (!newItem || !newItem.id) {
      console.warn("⚠️ Item invalid sau fără ID, nu adaug în lasts.");
      return {
        ok: false,
        reason: "invalid_item"
      };
    }

    // Verificăm dacă există deja un element cu același ID
    const alreadyExists = user[key].some(item => {
      const obj = Object.values(item || {})[0] || {};
      return obj.id === newItem.id;
    });
    if (alreadyExists) {
      console.log("⚠️ Item cu acest ID există deja în lasts.");
      return {
        ok: true,
        reason: "duplicate"
      };
    }

    // Adăugăm elementul la început
    user[key].unshift(value);

    // Limităm la maxim 3 elemente
    if (user[key].length > 3) {
      user[key] = user[key].slice(0, 3);
    }
    await (0, _firestore.updateDoc)(user_ref, {
      lasts: user[key]
    });
  }
  await (0, _firestore.updateDoc)(user_ref, user);
  return {
    ok: true
  };
};
exports.inside_user_stats = inside_user_stats;
const updateUserStats = async (req, res) => {
  const {
    key,
    value,
    id
  } = req.body;
  try {
    await inside_user_stats(key, value, id);
    res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "plm"
    });
  }
};
exports.updateUserStats = updateUserStats;
const refreshToken = async (req, res) => {
  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: req.body.refreshToken // Pass the refresh token here
      })
    });
    const data = await response.json();
    if (!data.id_token || !data.refresh_token) {
      console.error("[AUTH] Refresh token failed. Response:", data);
      return res.status(401).json({
        ok: false,
        error: "Refresh token invalid or expired"
      });
    }
    const newIdToken = data.id_token; // New ID token
    const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
    const expiresIn = data.expires_in; // Expiry time in seconds
    res.status(200).json({
      accessToken: newIdToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error("[AUTH] Error refreshing ID token:", error);
    res.status(500).json({
      ok: false
    });
  }
};
exports.refreshToken = refreshToken;
const getUserByEmail = async email => {
  // try {
  //   const userRecord = await auth_admin.getUserByEmail(email);
  //   console.log(`Înregistrare Auth utilizator găsită: ${userRecord.uid}`);
  //   return { ...userRecord };
  // } catch (error) {
  //   if (error.code === "auth/user-not-found") {
  //     console.log(`Niciun utilizator Auth găsit cu emailul: ${email}`);
  //     return null;
  //   }
  //   console.error("Eroare la recuperarea înregistrării Auth:", error);
  //   throw error;
  // }

  const user_ref = (0, _firestore.collection)(_config_fire.db, "users");
  const q = (0, _firestore.query)(user_ref, (0, _firestore.where)("email", "==", email));
  var querySnapshot = await (0, _firestore.getDocs)(q);
  return _objectSpread({
    id: querySnapshot.docs[0].id
  }, querySnapshot.docs[0].data());
};
exports.getUserByEmail = getUserByEmail;
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = _path.default.dirname(_filename);

// ⚙️ Config (înlocuiește cu ce ai nevoie)
const APPLE_SHARED_SECRET = "59acf87f515e4b5888714af93584ed07";
// const GOOGLE_KEYFILE = path.join(__dirname, "django-2546a-047c18bcd59d.json");

const verifyApple = async receiptData => {
  const url = "https://sandbox.itunes.apple.com/verifyReceipt"; // sau sandbox
  const response = await _axios.default.post(url, {
    "receipt-data": receiptData,
    password: "9d602485207548f7b4571bffb28aedea",
    "exclude-old-transactions": true
  });
  const data = response.data;
  if (data.status !== 0) {
    throw new Error(`Receipt invalid Apple (status ${data.status})`);
  }
  const latest = data.latest_receipt_info?.sort((a, b) => Number(b.expires_date_ms) - Number(a.expires_date_ms))[0];
  const isActive = latest && Number(latest.expires_date_ms) > Date.now();
  return {
    active: isActive,
    expiresAt: new Date(Number(latest.expires_date_ms)),
    transactionId: latest.original_transaction_id
  };
};
exports.verifyApple = verifyApple;
async function validateGooglePurchase(productId, purchaseToken) {
  const auth = new _googleapis.google.auth.JWT({
    email: _config.default.google.clientEmail,
    key: _config.default.google.privateKey,
    scopes: ["https://www.googleapis.com/auth/androidpublisher"]
  });
  const androidPublisher = _googleapis.google.androidpublisher({
    version: "v3",
    auth
  });
  try {
    const res = await androidPublisher.purchases.subscriptions.get({
      packageName: _config.default.google.packageName,
      subscriptionId: productId,
      token: purchaseToken
    });

    // ✅ Răspunsul conține statusul abonamentului
    const {
      expiryTimeMillis,
      autoRenewing,
      paymentState
    } = res.data;
    return {
      active: Number(expiryTimeMillis) > Date.now(),
      expiryDate: new Date(Number(expiryTimeMillis)),
      autoRenewing,
      paymentState
    };
  } catch (err) {
    console.error("Google validation error:", err.message);
    return {
      active: false,
      error: err.message
    };
  }
}