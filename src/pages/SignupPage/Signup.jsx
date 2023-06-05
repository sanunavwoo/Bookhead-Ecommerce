import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../contexts/AuthContext";
import { signupService } from "../../services/signupService";
import {NavLink, useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Navigation } from "../../components/NavBar/Navigation";
import {FooterComponent} from "../../components/Footer/FooterComponent";
import "./Signup.css";

export function Signup(){

    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]= useState('');

    const [isPasswordVisible, setIsPasswordVisible]= useState(false);


    const {stateAuth,dispatchAuth,isUserSignedUp,setIsUserSignedUp}= useContext(AuthContext);
    const navigate=useNavigate();
    function handleSignUp(){
        if(firstName === "" || lastName=== "" || email==="" || password===""){
            toast("Please fill all fields");
        }
        else if(password!==confirmPassword){
            toast.error("Password mismatch");
        }
        else{
            signupService(firstName,lastName,email,password,dispatchAuth,setIsUserSignedUp);
        console.log("Is authenticated--",stateAuth.isAuth);
        }

    }

    if(stateAuth.isAuth===true){
        navigate("/");
    }
    return(
    <>
        <Navigation />
        <div className="signup-container">
        
            <div className="signup-div">
                <h1>Create New Account</h1>
                <div className="password-wrapper">
                    <input onChange={(e)=>setFirstName(e.target.value)} required value={firstName} placeholder="Enter First Name"  />
                </div>
                <div className="password-wrapper">
                    <input onChange={(e)=>setLastName(e.target.value)} required value={lastName} placeholder="Enter Last Name" />
                </div>
                <div className="password-wrapper">
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" required />
                </div>
                <div className="password-wrapper">
                    <input type={isPasswordVisible? "text":"password"} onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Enter Password" required />
                    <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </span>
                </div>
                <div className="password-wrapper">
                    <input type={isPasswordVisible? "text":"password"} onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  placeholder="Confrim Password" required />
                    <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                    </span>
                </div>
                <button onClick={()=>handleSignUp()}>Sign Up</button>
                <button onClick={()=> signupService("John","Wick","jw@puppy.com","keanu",dispatchAuth,setIsUserSignedUp)}>Sign up as Guest</button>
                <p>Already a User? <NavLink to="/login">Login</NavLink></p> 
            </div>
            
        </div>
        <FooterComponent />
        <ToastContainer />
    </>
    );
}