import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userId, setUserId] = useState();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Function to add an item to the cart
  const addItemToCart = (product,number=1) => {
    setCart((prevCartItems) => {
      const existingIndex = prevCartItems.findIndex(
        (item) => item.id === product.id
      );
      increaseCart(number);

      if (existingIndex > -1) {
        // If the product exists, update the quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingIndex] = {
          ...updatedCartItems[existingIndex],
          quantity: updatedCartItems[existingIndex].quantity + number,
        };
        return updatedCartItems;
      } else {
        // If the product doesn't exist, add it with quantity = 1
        return [...prevCartItems, { ...product, quantity: number }];
      }
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
        // Find the index of the item in the cart
        const index = prevCart.findIndex(item => item.id === productId.id);

        // Check if the item is found
        if (index === -1) {
            console.error("Item not found in cart with ID:", productId.id);
            return prevCart;  // Return the unmodified cart if the item is not found
        }

        const item = prevCart[index];

        if (item.quantity > 1) {
            // If the quantity is more than one, decrement it
            const updatedCart = [...prevCart];
            updatedCart[index] = { ...item, quantity: item.quantity - 1 };
            return updatedCart;
        } else {
            // If the quantity is 1, filter out the item from the cart
            return prevCart.filter((_, idx) => idx !== index);
        }
    });
    decreaseCart(1);

};

  const AddToCart = ({ Product }) => {
    setCart((prevProduct) => prevProduct + Product);
  };

  const increaseCart = ( count = 1) => {
    setCartCount((prevCount) => prevCount + count);
  };

  // Function to decrease the cart count
  const decreaseCart = ( count = 1 ) => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - count : 0));
  };
  // Function to add an item to the cart

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,

        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        increaseCart,
        decreaseCart,
        cartCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
