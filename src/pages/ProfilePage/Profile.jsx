import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../components/NavBar/Navigation";
import { AddressContext } from "../../contexts/AddressContext";
import { v4 as uuid } from 'uuid';
import { AddressForm } from "../../components/AddressForm/AddressForm";
import "./Profile.css";
import { EditAddressForm } from "../../components/EditAddressForm/EditAddressForm";

export function Profile(){

    const navigate= useNavigate();
    const {stateAuth}= useContext(AuthContext);

    const [isAddAddressFlag,setIsAddAddressFlag]= useState(false);
    const [isEditFlag,setIsEditFlag]= useState(false);
    const [addressToBeUpdated,setAddressToBeUpdated]= useState(0);

    const {address,getAddress,addAddress,deleteAddress,userAddress,setUserAddress}= useContext(AddressContext);

    // const [userAddress,setUserAddress]= useState([{
    //     name:"Enzo",
    //     street:"Chelsea",
    //     city:"Rosario",
    //     state:"Rosario",
    //     country:"Argentina",
    //     zipCode:"S2002",
    //     mobile:"87518964"}])

    useEffect(()=>{
        getAddress();
    },[]);
    // console.log("UserDetails",stateAuth.userDetails);

    console.log("Address at profile--", address);
    return(
        <>  
            <Navigation />
            
            <div className="profile-page-container">
                {stateAuth.isAuth===true ?
                    <>
                        <div className="address-card-container">
                            <h1>My Address</h1>
                            {address?.length===0 ? 
                                <h2>No address found</h2> 
                            :
                                
                                    (address.map((currentAddress)=>
                                    <div className="address-card">    
                                            <div className="address-info">
                                                
                                                <h2>{currentAddress.name}</h2>
                                                <p>{currentAddress.street}, {currentAddress.city}, {currentAddress.state}, {currentAddress.country}</p>
                                                <p>{currentAddress.zipCode}</p>
                                                <p>{currentAddress.mobile}</p>
                                            </div>
                                            <div className="profile-horizontal-btns">
                                                <button className="address-delete-btn" onClick={()=>deleteAddress(currentAddress._id)}>Delete</button>
                                                <button className="address-edit-btn" onClick={()=>{
                                                    setIsEditFlag(true);
                                                    setAddressToBeUpdated(currentAddress);
                                                    }}>Edit</button>
                                                {isEditFlag && <EditAddressForm setIsEditFlag={setIsEditFlag} addressToBeUpdated={addressToBeUpdated} /> }
                                            </div>
                                    </div>
                            ))}
                            

                                    <button onClick={()=>setIsAddAddressFlag(true)} className="add-address-btn">+Add New Address</button>
                                    {isAddAddressFlag && <AddressForm setIsAddAddressFlag={setIsAddAddressFlag} />}
                        </div>

                        <div className="profile-card-container">
                                <h1>My Profile</h1>
                                <div className="profile-card">
                                    <div className="profile-image">
                                        <img src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg" alt="profile pic" />

                                    </div>
                                    <div className="profile-info">
                                        <h2>{stateAuth.userDetails[0].firstName} {stateAuth.userDetails[0].lastName}</h2>
                                        <p>{stateAuth.userDetails[0].email}</p>
                                    </div>
                                </div>
                            {/* {stateAuth.isAuth?(<h1>Name:{stateAuth.userDetails[0].firstName} {stateAuth.userDetails[0].lastName}</h1>) : navigate("/login")}         */}
                        </div>
                    </>
                    :
                    <div className="please-log-in-div">
                        <img src="https://freepngimg.com/download/puppy/33836-7-golden-retriever-puppy-file.png" style={{width: "100%"}} />
                        <h1>PLEASE LOG IN</h1>
                        <div style={{display:"none"}}>{setTimeout(()=>navigate("/login"),1500)}</div>    
                    </div>
                }
                
                
            </div>
        </>
    );
}