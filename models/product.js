class Product {
  constructor(
    productId,
    productName,
    mainImage,
    images,
    description,
    price,
    category
  ) {
    this.productId = productId;
    this.productName = productName;
    this.mainImage = mainImage;
    this.images = images;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}

module.exports = Product;
