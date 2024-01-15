import { useState } from "react";
import { UserContext } from "../context/UserContext";

export const UserProvider = ({children}) => {
    const [user, setUserDetails] = useState(null);
    
    const setUser = (user) => {
       setUserDetails(user);
    };
    

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
