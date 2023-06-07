import { useContext, useState,useEffect } from "react";
import { AddressContext } from "../../contexts/AddressContext";

export function EditAddressForm({addressToBeUpdated,setIsEditFlag}){

    // console.log("Prpos received--",props.selectedAddress);
    const {editAddressHandler,address,setAddress,getAddress}= useContext(AddressContext);
    // const addressIDtoBeChanged= props.selectedAddressID;

    const initialAddress = {
        name: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        mobile: '',
      };

    const [editAddressFormData,setEditAddressFormData]= useState(initialAddress);

        function handleEditAddress(e){
            console.log("Inside handleEditAddress");
            e.preventDefault();
           editAddressHandler(addressToBeUpdated._id,editAddressFormData);
            setIsEditFlag(false);
        }
        

        useEffect(()=>{
            getAddress();
            if(addressToBeUpdated!==0){
                setEditAddressFormData(()=>({...addressToBeUpdated}));
            }
        },[]);
    
    return(
        <>
            <div className="addAddressForm-container">
                <div className="addAddressForm">
                         <h2>Edit Address</h2>   
                         <form onSubmit={handleEditAddress}>
                            
                            <input
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value= {editAddressFormData.name}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                            <input
                                type="text"
                                placeholder="Enter Street Address"
                                name="street"
                                value= {editAddressFormData.street}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />  
                            <input
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                value= {editAddressFormData.city}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                            <input
                                type="text"
                                placeholder="Enter State"
                                name="state"
                                value= {editAddressFormData.state}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />    
                            <input
                                type="text"
                                placeholder="Enter Country"
                                name="country"
                                value= {editAddressFormData.country}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                            <input
                                type="number"
                                placeholder="Enter ZipCode"
                                name="zipCode"
                                value= {editAddressFormData.zipCode}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                               
                             /> 
                            <input
                                type="number"
                                placeholder="Enter Mobile Number"
                                name="mobile"
                                value= {editAddressFormData.mobile}
                                required
                                onChange={(e)=>setEditAddressFormData((editAddressFormData)=>({
                                    ...editAddressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                
                             /> 
                             <button type="submit">Submit</button>
                             <button onClick={()=>setIsEditFlag(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );
}