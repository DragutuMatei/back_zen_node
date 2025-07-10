import config from "./config.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, auth_admin, db, storage } from "../../config_fire.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const register = async (req, res) => {
  const { email, password, platform } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
        .then(async () => {
          await addDoc(collection(db, "users"), {
            email: email,
            time: new Date().getTime() / 1000,
            med_time: 0,
            resp_time: 0,
            carduri_alese: 0,
            abonament: "",
            platform: platform,
            lasts: [],
            imgUrl: "",
          });

          res.status(201).json({
            message: "Verification email sent! User created successfully!",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error sending email verification" });
        });
    })
    .catch((error) => {
      const errorMessage =
        error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    });
};

const login = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const idToken = userCredential._tokenResponse.idToken;

      if (idToken) {
        res.cookie("accessToken", idToken, {
          httpOnly: true,
        });
        console.log("AICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", {
          accessToken: idToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        });
        res.status(200).json({
          accessToken: idToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        });
      } else {
        console.log("log error");
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    });
};
async function check(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the token using Firebase Admin SDK
    var decodedToken = await auth_admin.verifyIdToken(token);
    var userId = decodedToken.uid; // Get the user ID from the decoded token
    const email = decodedToken["email"];
    const user_ref = collection(db, "users");
    const q = query(user_ref, where("email", "==", email));
    var querySnapshot = await getDocs(q);
    return [
      decodedToken,
      userId,
      { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() },
    ];
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
      data: { ...data },
    });
    res.status(200).send({
      userId: userId,
      decodedToken: decodedToken["email"],
      data: { ...data },
    });
  } catch (error) {
    res.status(200).send({});
  }
};

const logout = async (req, res) => {
  signOut(auth)
    .then(() => {
      res.clearCookie("accessToken");
      res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
function getBase64ImageExtension(base64Image) {
  // Ensure base64 image is not empty
  if (!base64Image) {
    return null;
  }

  // Decode the first few characters of the base64 string
  const byteString = atob(base64Image.slice(0, 30)); // Decode the first 30 characters
  const magicNumbers = byteString
    .substr(0, 4)
    .split("")
    .map((c) => c.charCodeAt(0)); // Get the first 4 byte values

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
  } else if (
    magicNumbers[0] === 0x52 &&
    magicNumbers[1] === 0x49 &&
    magicNumbers[2] === 0x46 &&
    magicNumbers[3] === 0x38
  ) {
    return "webp"; // WEBP
  }

  return null; // Return null if format is unrecognized
}

const inside_user_stats = async (key, value, id) => {
  const user_ref = doc(db, "users", id);
  let user = await getDoc(user_ref);
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
        type: `image/${getBase64ImageExtension(value)}`,
      });
      const storageRef = ref(
        storage,
        `/users/${id}-${user.email}.${getBase64ImageExtension(value)}`
      );

      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      user["imgUrl"] = url;
    } catch (error) {
      console.log(error);
      return { ok: false, error: "pula mea coaie" };
    }
  } else if (key === "lasts") {
    console.log("pullllllllllllllllllllllllaaaaaaaaaaaa");
    user[key].unshift(value);
    const length = 3;
    if (user[key].length > length) {
      user[key].length = length;
    }
    console.log(user[key]);
    await updateDoc(user_ref, { lasts: user[key] });
  }
  await updateDoc(user_ref, user);
  return { ok: true };
};
const updateUserStats = async (req, res) => {
  const { key, value, id } = req.body;
  try {
    await inside_user_stats(key, value, id);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "plm" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: req.body.refreshToken, // Pass the refresh token here
        }),
      }
    );

    // if (!response.ok) {
    //   throw new Error("Failed to refresh ID token");
    // }

    const data = await response.json();

    const newIdToken = data.id_token; // New ID token
    const newRefreshToken = data.refresh_token; // Updated refresh token (save it)
    const expiresIn = data.expires_in; // Expiry time in seconds
    res
      .status(200)
      .json({ accessToken: newIdToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing ID token:", error);
    res.status(500).json({ ok: false });
  }
};

const getUserByEmail = async (email) => {
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

  const user_ref = collection(db, "users");
  const q = query(user_ref, where("email", "==", email));
  var querySnapshot = await getDocs(q);
  return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚙️ Config (înlocuiește cu ce ai nevoie)
const APPLE_SHARED_SECRET = "59acf87f515e4b5888714af93584ed07";
const GOOGLE_KEYFILE = path.join(__dirname, "django-2546a-047c18bcd59d.json");

const verifyApple = async (receiptData) => {
  const url = "https://buy.itunes.apple.com/verifyReceipt"; // sau sandbox
  const response = await axios.post(url, {
    "receipt-data": receiptData,
    password: APPLE_SHARED_SECRET,
    "exclude-old-transactions": true,
  });

  const data = response.data;

  if (data.status !== 0) {
    throw new Error(`Receipt invalid Apple (status ${data.status})`);
  }

  const latest = data.latest_receipt_info?.sort(
    (a, b) => Number(b.expires_date_ms) - Number(a.expires_date_ms)
  )[0];

  const isActive = latest && Number(latest.expires_date_ms) > Date.now();

  return {
    active: isActive,
    expiresAt: new Date(Number(latest.expires_date_ms)),
    transactionId: latest.original_transaction_id,
  };
};

async function validateGooglePurchase(productId, purchaseToken) {
  const auth = new google.auth.JWT({
    email: config.google.clientEmail,
    key: config.google.privateKey,
    scopes: ["https://www.googleapis.com/auth/androidpublisher"],
  });

  const androidPublisher = google.androidpublisher({
    version: "v3",
    auth,
  });

  try {
    const res = await androidPublisher.purchases.subscriptions.get({
      packageName: config.google.packageName,
      subscriptionId: productId,
      token: purchaseToken,
    });

    // ✅ Răspunsul conține statusul abonamentului
    const { expiryTimeMillis, autoRenewing, paymentState } = res.data;

    return {
      active: Number(expiryTimeMillis) > Date.now(),
      expiryDate: new Date(Number(expiryTimeMillis)),
      autoRenewing,
      paymentState,
    };
  } catch (err) {
    console.error("Google validation error:", err.message);
    return { active: false, error: err.message };
  }
}
export {
  check,
  getUserByEmail,
  validateGooglePurchase,
  verifyApple,
  login,
  logout,
  inside_user_stats,
  register,
  updateUserStats,
  checkLogged,
  refreshToken,
};
