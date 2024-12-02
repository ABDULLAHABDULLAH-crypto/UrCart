import { collection, getDocs } from "firebase/firestore";
import { ProductData } from "../Data/ProductData";
import { db } from "../firebaseConfig";

export default async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));

    // Create a map to store product data
    const productMap = new Map();

    querySnapshot.forEach((doc) => {
      // Destructure document data
      const data = doc.data();

      // Create a ProductData instance for each document
      const product = new ProductData(
        data.category,
        data.description,
        data.isMeasurable,
        data.name,
        data.price, // Assuming `price` is already an object in Firestore
        data.imageSource
      );

      // Use document ID as the key in the map
      productMap.set(doc.id, product);
    });

    // console.log("Product Map:", productMap);

    // Optionally return the map for further use
    return productMap;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
