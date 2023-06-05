import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from "../../contexts/AuthContext";
import { loginService } from "../../services/loginService";
import { FooterComponent } from "../Footer/FooterComponent";
import { Navigation } from "../NavBar/Navigation";
import "./AuthLogin.css";

export function AuthLogin(){

    const [loginEmail,setLoginEmail]= useState();
    const [loginPassword,setLoginPassword]= useState();
    const {stateAuth,dispatchAuth}= useContext(AuthContext);

    const [isVisible, setIsVisible]= useState(false);

    const navigate= useNavigate();
    function handleLogin(){
        if(loginEmail ==="" || loginPassword ===""){
            toast("Please fill all fields");
           
        }
        else{
            
            loginService(loginEmail,loginPassword,dispatchAuth);
        
        }   
        
    }

    if(stateAuth.isAuth===true){
        navigate("/");
    }
    // const {loginHandler}= useContext(AuthContext);
    return(
    <>
    <Navigation />
    <div className="login-container">
        <div className="login-div" style={{padding: "5rem"}}>
            <h1>Log In</h1>
            <div className="password-wrapper">
                <input type="text" onChange={(e)=>setLoginEmail(e.target.value)} value={loginEmail} placeholder="Enter Email" required />
            
            </div>
            <div className="password-wrapper">
                <input type={isVisible?"text":"password"} onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} placeholder={isVisible?"Enter Password":"*****"} required />
                <span onClick={()=>setIsVisible(!isVisible)}>
                    {isVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </span>
            </div>
            <button onClick={()=>handleLogin()}>Submit</button>
            <button onClick={()=>loginService("adarshbalika@gmail.com","adarshbalika",dispatchAuth)}>Login as Guest</button>
            <p>Dont have an account? <NavLink to="/signup">Create one</NavLink></p>
            
        </div>
    </div>
    <FooterComponent /> 
    <ToastContainer  /> 
    </>);
}