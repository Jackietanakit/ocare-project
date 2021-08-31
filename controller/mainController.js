const firebase = require("../database/db");
const Maincomponent = require("../models/maincomponent");
const firestore = firebase.firestore();

const getMainComponent = async (req, res) => {
  try {
    // store last document
    let lastestDoc = null;
    let category = "";
    let index = null;

    if (!req.body.lastestDocTime) {
      lastestDoc = null;
    } else {
      lastestDoc = parseInt(req.body.lastestDocTime);
    }

    if (!req.body.category) {
      category = "";
    } else {
      category = String(req.body.category);
    }

    if (!req.body.index) {
      index = null;
    } else {
      index = parseInt(req.body.index);
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

      let search = [];
      if (category != "") {
        for (i in productsInfoArray) {
          if (
            productsInfoArray[i].category.toLowerCase() ==
            category.toLowerCase()
          ) {
            search.push(productsInfoArray[i]);
          }
        }
      } else {
        search.push(...productsInfoArray);
      }

      // add profile data (username, pic) to maincomponent
      if (!search.empty) {
        let counter = 0;
        for (i in search) {
          const profileInfo = await firestore
            .collection("Profile")
            .doc(uidArray[i]);
          let profileData = await profileInfo.get();
          search[i].username = profileData.data().displayName;
          search[i].userImage = profileData.data().userImage;
          counter++;
        }
        const result = tripArray(index, counter, search);
        res.send(result);
      } else {
        let counter = 0;
        for (i = 0; i < productsInfoArray.length; i++) {
          const profileInfo = await firestore
            .collection("Profile")
            .doc(uidArray[i]);
          let profileData = await profileInfo.get();
          productsInfoArray[i].username = profileData.data().displayName;
          productsInfoArray[i].userImage = profileData.data().userImage;
          counter++;
        }
        const result = tripArray(index, counter, productsInfoArray);
        res.send(result);
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

function tripArray(num, counter, array) {
  let index = parseInt(num);
  let tripArray = [];
  if (index > 0) {
    if (counter - index * 10 > 0) {
      tripArray = array.splice(index * 10);
      return tripArray;
    } else {
      return "No more products!";
    }
  } else {
    tripArray = array.splice(0, 10);
    return tripArray;
  }
}

module.exports = {
  getMainComponent,
};
