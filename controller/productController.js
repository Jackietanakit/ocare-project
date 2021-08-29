const db = require("../database/db");
const Product = require("../models/product");
const { uploadProduct } = require("../helper/uploadImage");
const firestore = db.firestore();

const addProduct = async (req, res, next) => {
  try {
    if (!req.body || !req.files) {
      res.status(400).send("Data not complete");
    } else {
      // Using userId :/
      const uid = req.body.uid;
      const data = req.body;
      // Upload image and get Url
      const imagesUrl = await uploadProduct(req.files, uid, data);
      data.mainImage = imagesUrl.splice(0, 1);
      data.images = imagesUrl;
      data.uid = uid;
      await firestore.collection("Product").doc().set(data);

      res.send("Product created");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await firestore.collection("Product").doc(id);
    const data = await product.get();
    if (!data.exists) {
      res.status(404).send("Product with the given ID not found");
    } else {
      data.forEach((doc) => {
        const product = new Product(
          doc.id,
          doc.data().productName,
          doc.data().mainImage,
          doc.data().images,
          doc.data().description,
          doc.data().price,
          doc.data().category
        );
        res.send(product);
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProduct,
  getProduct,
};
