import { createContext, useContext, useState } from "react";

export const AppContent = createContext()

export const AppContextProvider = ({children}) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
    }

    return(
    <AppContent.Provider value={value}>
        {children}
    </AppContent.Provider>
    )
}

export const useContextData = ()=>{
    return useContext(AppContent)
}