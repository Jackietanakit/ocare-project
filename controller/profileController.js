const db = require("../database/db");
const Profile = require("../models/profile");
const { uploadProfile } = require("../helper/uploadImage");
const firestore = db.firestore();

// happen instance when create account
const addProfile = async (req, res, next) => {
  try {
    const data = req.body;
    const uid = "some-uid";

    const imageUrl = await uploadProfile(req.file, uid);
    data.imageUser = imageUrl;

    await firestore.collection("Profile").doc(uid).set(data);
    res.send("Profile updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// edit profile
const editProfile = async (req, res, next) => {
  const profile = new Profile();
  db.collection("Profile").doc(req.body.productId);
};

module.exports = {
  editProfile,
  addProfile,
};
