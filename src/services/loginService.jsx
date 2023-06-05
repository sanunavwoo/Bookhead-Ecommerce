import axios from "axios";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { AuthContext } from "../contexts/AuthContext";

export const loginService=async(email,password,dispatchAuth)=>{

    // setIsUserLoggedIn(false);
    // const {isUserLoggedIn, setIsUserLoggedIn}= useContext(AuthContext);
    
    try{
        const res= await axios({
            method: 'post',
            url: '/api/auth/login',
            data: {
                email:email,
                password: password
            }
        });
        if(res.status===200){
            console.log(res.data.foundUser);

            // localStorage.setItem("Token", res.data.encodedToken);
            localStorage.setItem("loginDetails",JSON.stringify({user: res.data.foundUser, token: res.data.encodedToken}));
            // dispatchAuth({
            //     type:"GET_USER_DETAILS",
            //     payload: res.data.foundUser
            // });

            dispatchAuth({
                type:"GET_USER_DETAILS",
                payload:  {user: res.data.foundUser, token: res.data.encodedToken}
            });

            //setUserDetails(res.data.foundUser)
            
            // setIsUserLoggedIn(true);
            
            
        }
    }
    catch(e){
        console.error(e);
        if(e.status===404){
            toast.error("Incorrect Credentials");
            console.error("Incorrect Credentials");
        }
        toast.error("Incorrect Credentials");
    }
}