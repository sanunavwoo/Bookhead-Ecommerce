import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AddressContext= createContext();

export function AddressContextProvider({children}){

    // const [address,setAddress]= useState([{
    //     name:"Enzo",
    //     street:"Chelsea",
    //     city:"Rosario",
    //     state:"Rosario",
    //     country:"Argentina",
    //     zipCode:"S2002",
    //     mobile:"87518964"}]);

    const [address,setAddress]= useState([]);
    const {stateAuth}= useContext(AuthContext);

    const [userAddress,setUserAddress]= useState([{
        name:"Enzo",
        street:"Chelsea",
        city:"Rosario",
        state:"Rosario",
        country:"Argentina",
        zipCode:"S2002",
        mobile:"87518964"}])

    const [addressFormData,setAddressFormData]= useState({
            name:"",
            street:"",
            city:"",
            state:"",
            country:"",
            zipCode:"",
            mobile:"",
            }
        );    


    const getAddress= async ()=>{
        try{
            const res= await axios({
                method:'get',
                url:"/api/user/address",
                headers:{
                    authorization: stateAuth.token
                },
            });

            if(res.status===200){
                setAddress(res.data.address);
                console.log("inside 200 address", res.data.address);
            }
            console.log("Address Response::",res.data.address);

        }
        catch(e){
            console.error(e);
        }
    }

    const addAddress= async addressToAdd => {
        console.log("Address to add: ",addressToAdd);
        try {
          const response = await fetch('/api/user/address', {
            method: 'POST',
            headers: {
              authorization: stateAuth.token,
            },
            body: JSON.stringify({ address: addressToAdd }),
          });
    
          if (response.status === 201) {
            
            console.log("201 added to address");
          }
        } catch (e) {
          console.log(e);
        } finally {
          getAddress();
        }
      };

      const deleteAddress= async (addressIdToBeDeleted)=>
      {
        try{    
            const res= await axios(`/api/user/address/${addressIdToBeDeleted}`,
            {
                method:'DELETE',
                headers: {
                    authorization: stateAuth.token,
                },
            });

            if(res.status===200){
                console.log("Address deleted-- ",addressIdToBeDeleted);
            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            getAddress();
        }
      }

      const editAddressHandler=async (editedAddressID, editedAddress)=>{
        console.log("Edit request received--", editedAddress);
        try{    
            const res= await axios(`/api/user/address/${editedAddressID}`,
            {
                method:'POST',
                headers: {
                    authorization: stateAuth.token,
                },
                body: JSON.stringify({ address: editedAddress }),
            });

            if(res.status===200){
                console.log("Address updated-- ",editedAddress);
            }
        }
        catch(e){
            console.log(e);
        }
        finally{
            getAddress();
        }
      }

    useEffect(()=>{
        getAddress();
    },[]);
    return(
        <AddressContext.Provider value={{address,getAddress,addAddress,deleteAddress,editAddressHandler,userAddress,setUserAddress,addressFormData,setAddressFormData}} >
            {children}
        </AddressContext.Provider>
    );
}