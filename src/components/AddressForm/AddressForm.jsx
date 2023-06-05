import { useContext, useState } from "react";
// import { Modal,ModalHeader,ModalBody } from "reactstrap";
import { AddressContext } from "../../contexts/AddressContext";
import "./AddressForm.css"

export function AddressForm({setIsAddAddressFlag}){
    // const [modal,setModal]= useState(true);
    const {addAddress,addressFormData,setAddressFormData}= useContext(AddressContext);

    console.log("Inside addressFormComponent");
    // const [addressFormData,setAddressFormData]= useState({
    //     name:"",
    //     street:"",
    //     city:"",
    //     state:"",
    //     country:"",
    //     zipCode:"",
    //     mobile:"",
    //     }
    // );

    function handleAddAdress(e){
        e.preventDefault();
        console.log("From handleAddress func--", addressFormData);
        addAddress(addressFormData);

        setIsAddAddressFlag(false);
    }

    return(
        <>
            <div className="addAddressForm-container">
                <div className="addAddressForm">
                         <h2>Add New Address</h2>   
                         <form onSubmit={handleAddAdress}>
                            
                            <input
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value= {addressFormData.name}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                            <input
                                type="text"
                                placeholder="Enter Street Address"
                                name="street"
                                value= {addressFormData.street}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />  
                            <input
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                value= {addressFormData.city}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                            <input
                                type="text"
                                placeholder="Enter State"
                                name="state"
                                value= {addressFormData.state}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />    
                            <input
                                type="text"
                                placeholder="Enter Country"
                                name="country"
                                value= {addressFormData.country}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                            <input
                                type="number"
                                placeholder="Enter ZipCode"
                                name="zipCode"
                                value= {addressFormData.zipCode}
                                
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                            <input
                                type="number"
                                placeholder="Enter Mobile Number"
                                name="mobile"
                                value= {addressFormData.mobile}
                                required
                                onChange={(e)=>setAddressFormData((addressFormData)=>({
                                    ...addressFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                             <button type="submit">Submit</button>
                             <button onClick={()=>setIsAddAddressFlag(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );
}