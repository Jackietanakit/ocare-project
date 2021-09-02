const db = require("../database/db");
const Profile = require("../models/profile");
const { uploadProfile } = require("../helper/uploadImage");
const firestore = db.firestore();

// happen after create account
const addProfile = async (req, res) => {
  try {
    const data = req.body;
    const uid = req.uid;

    const imageUrl = await uploadProfile(req.file, uid);
    data.imageUser = imageUrl;

    await firestore.collection("Profile").doc(uid).set(data, { merge: true });
    res.send("Profile updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// edit profile
const editProfile = async (req, res) => {
  try {
    if (!req.body && !req.file) {
      res.status(400).send("Nothing to change");
    } else {
      const data = req.body;
      const uid = req.uid;

      if (req.file) {
        const imageUrl = await uploadProfile(req.file, uid);
        data.imageUser = imageUrl;
      }

      await firestore.collection("Profile").doc(uid).set(data, { merge: true });
      res.status(200).send("Ok");
    }
  } catch {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProfile,
  editProfile,
};
