import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});



export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(()=>{
        if(!user){
           axios.get('/profile').then((response)=>{
            const userData = response.data;
            setUser(userData);
            setReady(true);
           });
           
        }
    },[])

  return(
    <UserContext.Provider value={{user,setUser,ready}}>
    {children}
    </UserContext.Provider> 
  ); 
}
