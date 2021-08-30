const firebase = require("../database/db");
const Product = require("../models/product");
const { uploadProduct } = require("../helper/uploadImage");
const firestore = firebase.firestore();

const addProduct = async (req, res) => {
  try {
    if (!req.body || !req.files) {
      res.status(400).send("Data not complete");
    } else {
      // Uid from Middleware
      const uid = req.uid;
      const data = req.body;

      // Upload image and get Url
      const imagesUrl = await uploadProduct(req.files, uid, data);

      // Add data to Object data
      data.mainImage = imagesUrl[0];
      data.images = imagesUrl.splice(1);
      data.uid = uid;
      data.time = Date.now();

      // Upload text to firestore
      await firestore.collection("Product").doc().set(data);
      res.status(200).send("Product created");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productRef = await firestore.collection("Product").doc(id);
    const data = await productRef.get();
    if (!data.exists) {
      res.status(404).send("Product with the given ID not found");
    } else {
      const product = new Product(
        data.id,
        data.data().productName,
        data.data().mainImage,
        data.data().images,
        data.data().description,
        data.data().price,
        data.data().category
      );
      res.send(product);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Still editing :(
const editProduct = async (req, res) => {
  if (!req.body && !req.files) {
    res.status(400).send("Nothing to change");
  } else {
    const data = req.body;
    const images = req.files;
    const uid = req.uid;

    console.log(data);

    var productRef = firestore.collection("Product").doc(data.id);

    // delete images in Firebase
    for (i in data.imagesDelete) {
      await productRef.update({
        images: firebase.firestore.FieldValue.arrayDelete(data.imagesDelete[i]),
      });
    }

    if (data.mainImgExist == "true") {
      const mainImageUrl = await uploadProduct(
        images.splice(0, 1),
        uid,
        "edit"
      );
      data.mainImage = mainImageUrl;
    }
    const uploadImages = images;

    // upload images to Firebase
    if (uploadImages) {
      const imagesUrl = await uploadProduct(uploadImages, uid, "edit");
      console.log(imagesUrl);
      for (i in imagesUrl) {
        await productRef.update({
          images: firebase.firestore.FieldValue.arrayUnion("Yay"),
        });
      }
    }

    for (const property in data) {
      if (!data[property]) {
        delete data[property];
      }
    }

    // delete id before edit
    delete data.mainImgExist;
    delete data.id;
    console.log(data);
    // await productRef
    //   .set(data, { merge: true });
    res.status(200).send("Ok");
  }
};

module.exports = {
  addProduct,
  getProduct,
  editProduct,
};
