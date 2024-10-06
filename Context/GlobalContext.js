import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext,createContext,useEffect,useState } from "react";

const GlobalContext=createContext();

const auth = getAuth();

const signin = () => {
  // Here we will fetch the data from firebase
  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  const handleSignIn= async () =>{
    try{
        const userCredential=await signInWithEmailAndPassword(auth, form.email,form.password);
        console.log( userCredential.user);
        router.push("/home");
    }catch(error) {
        console.error("Error signing in : ",error.message);
        Alert.alert("Email or Password is wrong");
      }}
}

export const useGlobalContext=()=>useContext(GlobalContext);

const GlobalProvider=({children})=>{
    const [isLoggedIn,setLoggedIn]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,SetIsLoading]=useState(false);
return(
<GlobalContext.Provider value={{
        user,
        isLoggedIn,
        isLoading

}}>
    {children}
</GlobalContext.Provider>

)


}


export default GlobalProvider;

