import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const auth = getAuth();

const signin = () => {
  // Here we will fetch the data from firebase
  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(userCredential.user);
      router.push("/home");
    } catch (error) {
      console.error("Error signing in : ", error.message);
      Alert.alert("Email or Password is wrong");
    }
  };
};

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount,setCartCount]=useState(0);

  const increaseCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  // Function to decrease the cart count
  const decreaseCart = () => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
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
        user,
        isLoggedIn,
        isLoading,
        cart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        increaseCart,
        decreaseCart,
        cartCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
