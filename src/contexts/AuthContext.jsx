import { createContext, useReducer, useState } from "react";
import { authReducerFunc } from "../reducers/authReducerFunc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext= createContext(null);

export function AuthContextProvider({children}){
    
    const navigate= useNavigate();
    const [isUserSignedUp,setIsUserSignedUp]= useState(false);

    const localStorageToken= localStorage.getItem("loginDetails");

    // const [token,setToken]= useState(localStorageToken?.token);

    const token=localStorageToken?.token;

    const [stateAuth, dispatchAuth]= useReducer(authReducerFunc,{
        userDetails:[],
        token: token?? null,
        isAuth: token? true:false
    });
    

    // const loginHandler=async (email,password)=>{
    //     setIsUserLoggedIn(false);
    //     try{
    //         const res= await axios({
    //             method: 'post',
    //             url:'/api/auth/login',
    //             data: 
    //                 JSON.stringify({
    //                     email: email,
    //                     password: password
    //                 }),

    //         });
    //         if (res.status===200){
    //             console.log("Found User",res.data.foundUser);
    //             localStorage.setItem(
    //                 'key',
    //                 res.data.encodedToken
    //                 );
    //             setIsUserLoggedIn(true);
    //             navigate('/products');
    //         }
    //         else{
    //             setIsUserLoggedIn(false);
    //         }
    //     }
    //     catch(e){
    //         console.error(e);
    //     }
    // }

    return(
        <AuthContext.Provider value={{stateAuth,dispatchAuth, isUserSignedUp,setIsUserSignedUp}}>
            {children}
        </AuthContext.Provider>
    );
}