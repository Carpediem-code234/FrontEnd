import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {

    const [is_logueado, setIsLogueado] = useState(false);

    const getIsLogueado = () => {
        return is_logueado;
    };

    const logIn = () => {
        setIsLogueado(true);
    };

    const logOut = () => {
        setIsLogueado(false);
    };

    return (
        <AuthContext.Provider value={ {getIsLogueado, logIn, logOut} }>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    return useContext(AuthContext);
}