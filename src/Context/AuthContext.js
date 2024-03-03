import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider ({children}) {
    const [userToken, setUserToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const token = localStorage.getItem("token")



    useEffect(() => {
        
        if (token) {
            let {id} = jwtDecode(token)
            setUserToken(token);
            setUserId(id);
        } 
    }, [])

    return (
        <AuthContext.Provider value={{userToken, setUserToken}}>
        {children}
        </AuthContext.Provider>
    );
}