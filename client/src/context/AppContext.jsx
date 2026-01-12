import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const [error, setError] = useState("")
  const [loading , setLoading] = useState(false)


  axios.defaults.withCredentials = true;

  const getAuthState = async () =>{
    try {
      const {data} = await axios.get(backendUrl + "/api/auth/is-auth")
      if(data.success){
        setIsLoggedin(true)
        setUserData(data.data.user);
      }
      
    } catch (error) {
       console.log()
    }
  }


  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) {
        setUserData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);
      console.log(error);
    }
  };

  useEffect(() =>{
    getAuthState();
  },[])

  



  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    loading,
    setLoading
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};

export const useContextData = () => {
  return useContext(AppContent);
};
