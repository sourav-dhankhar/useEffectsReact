import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
    isLoggedIn: false,
    logout: function () { },
    login: function (emailState, passwordState) { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isCandidateLoggedIn = localStorage.getItem('loggedIn');
    useEffect(() => {
        if (isCandidateLoggedIn === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('loggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('loggedIn');
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, logout: logoutHandler, login: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;