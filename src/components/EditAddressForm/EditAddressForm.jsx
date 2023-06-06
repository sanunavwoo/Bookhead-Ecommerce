import { useContext, useState } from "react";
import { AddressContext } from "../../contexts/AddressContext";

export function EditAddressForm(props){

    console.log(props.selectedAddress);
    const {editAddressHandler}= useContext(AddressContext);

    const [editAddressFormData,setEditAddressFormData]= useState({
        
            name:props.selectedAddress.name,
            street:props.selectedAddress.street,
            city:props.selectedAddress.city,
            state:props.selectedAddress.state,
            country:props.selectedAddress.country,
            zipCode:props.selectedAddress.zipCode,
            mobile:props.selectedAddress.mobile,
            }
        );

        function handleEditAddress(e){
            console.log("Inside handleEditAddress");
            e.preventDefault();
            editAddressHandler(props.selectedAddress._id,editAddressFormData);
            props.setIsEditFlag(false);
        }
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
                             <button onClick={()=>props.setIsEditFlag(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );
}