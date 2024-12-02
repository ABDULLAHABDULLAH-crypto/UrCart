export class ProductData {
  constructor(category, description, isMeasuarble, name, price, imageSource) {
    this.name = name;
    this.description = description;
    this.imageSource = imageSource;
    this.category = category;
    this.isMeasuarble = isMeasuarble;
    this.price= price;
  }
}
