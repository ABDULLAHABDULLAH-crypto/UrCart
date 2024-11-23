import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userId, setUserId] = useState();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const AddToCart = ({ Product }) => {
    setCart((prevProduct) => prevProduct + Product);
  };

  const increaseCart = ({ count = 1 }) => {
    setCartCount((prevCount) => prevCount + count);
  };

  // Function to decrease the cart count
  const decreaseCart = ({ count = 1 }) => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - count : 0));
  };
  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

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
