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
    const id = req.query.productId;
    console.log(id);
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

const editProduct = async (req, res) => {
  try {
    console.log(req.body);
    // import from middleware
    const data = req.body;
    const uid = req.uid;
    const images = data.images;
    const docId = req.body.productId;
    console.log(images);

    // case when update main
    if (data.mainImgChange == "true") {
      const imagesUrl = await uploadProduct(req.files, uid, data);
      if (imagesUrl.length >= 2) {
        data.mainImage = imagesUrl[0];
        const smallUrl = imagesUrl.splice(1);
        for (i in smallUrl) {
          images.push(smallUrl[i]);
        }
        console.log(images);
        data.images = images;
      } else {
        // update only main images
        data.mainImage = imagesUrl[0];
      }
    } else {
      const imagesUrl = await uploadProduct(req.files, uid, data);
      for (i in imagesUrl) {
        images.push(imagesUrl[i]);
      }
      data.images = images;
    }

    delete data.mainImgChange;
    delete data.productId;
    await firestore.collection("Product").doc(docId).set(data, { merge: true });
    res.status(200).send("Edit successfully");
  } catch {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProduct,
  getProduct,
  editProduct,
};
