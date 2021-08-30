class Product {
  constructor(
    productId,
    productName,
    mainImage,
    images,
    description,
    price,
    category,
    time
  ) {
    this.productId = productId;
    this.productName = productName;
    this.mainImage = mainImage;
    this.images = images;
    this.description = description;
    this.price = price;
    this.category = category;
    this.time = time;
  }
}

module.exports = Product;
