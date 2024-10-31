"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.updateUserStats = exports.register = exports.refreshToken = exports.logout = exports.login = exports.checkLogged = void 0;
var _auth = require("firebase/auth");
var _config_fire = require("../../config_fire");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      error: "Unauthorized"
    });
  }
  const token = authHeader.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the token using Firebase Admin SDK
    var decodedToken = await _config_fire.auth_admin.verifyIdToken(token);
    var userId = decodedToken.uid; // Get the user ID from the decoded token
    const email = decodedToken["email"];
    const user_ref = (0, _firestore.collection)(_config_fire.db, "users");
    const q = (0, _firestore.query)(user_ref, (0, _firestore.where)("email", "==", email));
    var querySnapshot = await (0, _firestore.getDocs)(q);
    return [decodedToken, userId, _objectSpread({
      id: querySnapshot.docs[0].id
    }, querySnapshot.docs[0].data())];
  } catch (error) {
    // console.error("data:", error);
    return false;
    // res.status(500).send({ error: "Internal Server Error" });
  }
}
const checkLogged = async (req, res) => {
  // const user = auth.currentUser;
  // let ok = false;
  // if (user) ok = true;
  // res.status(200).json({ user });
  try {
    const [decodedToken, userId, data] = await check(req);
    console.log({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: _objectSpread({}, data)
    });
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
const updateUserStats = async (req, res) => {
  const {
    key,
    value,
    id
  } = req.body;
  console.log(key);
  try {
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
        res.status(500).json({
          ok: false,
          error: "pula mea coaie"
        });
      }
    } else if (key === "lasts") {
      console.log("pullllllllllllllllllllllllaaaaaaaaaaaa");
      user[key].unshift(value);
      const length = 3;
      if (user[key].length > length) {
        user[key].length = length;
      }
      console.log(user[key]);
      await (0, _firestore.updateDoc)(user_ref, {
        lasts: user[key]
      });
    }
    await (0, _firestore.updateDoc)(user_ref, user);
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

    // if (!response.ok) {
    //   throw new Error("Failed to refresh ID token");
    // }

    const data = await response.json();
    const newIdToken = data.id_token; // New ID token
    const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
    const expiresIn = data.expires_in; // Expiry time in seconds
    res.status(200).json({
      accessToken: newIdToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error("Error refreshing ID token:", error);
    res.status(500).json({
      ok: false
    });
  }
};
exports.refreshToken = refreshToken;