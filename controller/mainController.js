const firebase = require("../database/db");
const Maincomponent = require("../models/maincomponent");
const firestore = firebase.firestore();

const getMainComponent = async (req, res) => {
  try {
    // store last document
    let lastestDoc = null;

    if (!req.body.lastestDocTime) {
      lastestDoc = null;
    } else {
      lastestDoc = parseInt(req.body.lastestDocTime);
    }

    // Create Product Ref
    const productRef = await firestore
      .collection("Product")
      .orderBy("time")
      .limit(10)
      .startAfter(lastestDoc || 0);
    const productData = await productRef.get();

    const productsInfoArray = [];
    const uidArray = [];

    if (productData.empty) {
      res.status(404).send("No product record");
    } else {
      productData.forEach((doc) => {
        const mainComponent = new Maincomponent(
          doc.id,
          doc.data().productName,
          doc.data().mainImage,
          doc.data().images,
          doc.data().description,
          doc.data().time
        );
        productsInfoArray.push(mainComponent);
        uidArray.push(doc.data().uid);
        //console.log(productData);
      });

      // add profile data (username, pic) to maincomponent
      for (i = 0; i < productsInfoArray.length; i++) {
        const profileInfo = await firestore
          .collection("Profile")
          .doc(uidArray[i]);
        let profileData = await profileInfo.get();
        productsInfoArray[i].username = profileData.data().displayName;
        productsInfoArray[i].userImage = profileData.data().userImage;
      }
      res.send(productsInfoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const searchMainComponent = async (req, res) => {
  try {
    // store last document
    let lastestDoc = null;
    const category = String(req.body.category);

    if (!req.body.lastestDocTime) {
      lastestDoc = null;
    } else {
      lastestDoc = parseInt(req.body.lastestDocTime);
    }

    // Create Product Ref
    const productRef = await firestore
      .collection("Product")
      .orderBy("time")
      .startAfter(lastestDoc || 0);
    const productData = await productRef.get();

    const productsInfoArray = [];
    const uidArray = [];

    if (productData.empty) {
      res.status(404).send("No product record");
    } else {
      productData.forEach((doc) => {
        const mainComponent = new Maincomponent(
          doc.id,
          doc.data().productName,
          doc.data().mainImage,
          doc.data().images,
          doc.data().description,
          doc.data().time,
          doc.data().category
        );
        productsInfoArray.push(mainComponent);
        uidArray.push(doc.data().uid);
      });
      //console.log(uidArray);

      let search = [];
      let y = 0;
      for (i in productsInfoArray) {
        if (
          productsInfoArray[i].category.toLowerCase() == category.toLowerCase()
        ) {
          search.push(productsInfoArray[i]);
        } else {
        }
      }

      let counter = 0;
      // add profile data (username, pic) to maincomponent
      for (i in search) {
        const profileInfo = await firestore
          .collection("Profile")
          .doc(uidArray[i]);
        let profileData = await profileInfo.get();
        search[i].username = profileData.data().displayName;
        search[i].userImage = profileData.data().userImage;
        counter++;
      }
      // console.log(counter);

      let index = parseInt(req.body.index);
      let tripArray = [];
      if (index > 0) {
        if (counter - index * 10 > 0) {
          tripArray = search.splice(index * 10);
          res.send(tripArray);
        } else {
          res.status(404).send("no more products!");
        }
      } else {
        tripArray = search.splice(0, 10);
        res.send(tripArray);
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getMainComponent,
  searchMainComponent,
};
