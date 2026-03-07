

import { createContext, useState } from "react";


export const UserContext = createContext();

const UserProvider = ({children})=> {
    const [user, setUser] = useState(null);

    //function to update data

    const updateUser = (userData) => {
        setUser(userData);
    };

    //funcion to clear data (logut)

    const clearUser = ()=>{
        setUser(null);
    };

    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser
        }}>
            {children}
        </UserContext.Provider>
    );

} 

export default UserProvider;