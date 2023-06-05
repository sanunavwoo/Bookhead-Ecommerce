import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export const CartContext= createContext();

export function CartContextProvider({children}){

    const [cartItems,setCartItems]= useState([]);
    const {stateAuth}= useContext(AuthContext);
    const [isLoading,setIsLoading]= useState(false);

    const [inputedDiscountCode,setInputedDiscountCode]= useState("");
    const [discountPercent, setDiscountPercent]= useState(0);

    const discountHandler= ()=>{
        if(inputedDiscountCode.trim().toUpperCase()==="BOOKHEAD15"){
            setDiscountPercent(0.15);
        }
        else{
            setDiscountPercent(0);
        }
    }

    const navigate=useNavigate();

    const itemInCartFlag= (idToCheck)=>cartItems.findIndex(({_id})=>Number(_id)===Number(idToCheck));
    // const itemInCart= (idToFind)=>cartItems.find(({_id})=>Number(_id)===Number(idToFind));

    const addItemToCart=async (productToAdd,isMoveToCart)=>{console.log("Product to Add received ",productToAdd);
   
        const isItemInCart= itemInCartFlag(productToAdd._id);
    console.log("Is item in cart arr:", isItemInCart);
        if(isItemInCart===-1){
            try{
                // const res= await axios({
                //     method: 'post',
                //     url:"/api/user/cart",
                //     headers: {
                //         authorization: localStorage.getItem("Token")
                //     },
                //     data: ({
                //         product: productToAdd,
                //     }),

                const res= await axios({
                    method: 'post',
                    url:"/api/user/cart",
                    headers: {
                        authorization: stateAuth.token
                    },
                    data: ({
                        product: productToAdd,
                    }),

                });
                if(res.status===201){
                    console.log("Added to cart response 201");
                    // setCartItems((cartItems)=>[...cartItems, res.data.cart]);
                    !isMoveToCart  && toast("Added to Cart");
                }
            }
            catch(e){
                console.error(e);
            }
        }
        else{
            incrementCartQuantity(productToAdd);
        }
        getItemsOfCart();
    }

    const getItemsOfCart=async ()=>{
        setIsLoading(true);
        try{
            // const res= await axios({
            //     method:'get',
            //     url:"/api/user/cart",
            //     headers:{
            //         authorization: localStorage.getItem("Token")
            //     },

            const res= await axios({
                method:'get',
                url:"/api/user/cart",
                headers:{
                    authorization: stateAuth.token
                },
              
            });
            if(res.status===200){
                console.log("Inside 200 getItemsCart");
                console.log("Response cart",res.data.cart);
               setCartItems(res.data.cart);  
               setIsLoading(false);

            }
        }
        catch(e){
            console.error(e);
        }
    }


    const incrementCartQuantity= async (productToAdd)=>{
        console.log("Increment request for ",productToAdd);
        
            try{
                // const res= await axios.post(
                //     `/api/user/cart/${productToAdd._id}`,
                //     { action: { type: "increment" } },
                //     {
                //     headers: { authorization: localStorage.getItem("Token") },
                //     }

                const res= await axios.post(
                    `/api/user/cart/${productToAdd._id}`,
                    { action: { type: "increment" } },
                    {
                    headers: { authorization: stateAuth.token },
                    }
                );
                if(res.status===200){
                    // setCartItems(res.data.cart);
                    console.log("Incremented");
                }

            }
    
        catch(e){
            console.error(e);
        }

        getItemsOfCart();
    }

    const decrementCartQuantity= async (productToAdd)=>{
        console.log("Decrement request for ",productToAdd);
        if(productToAdd.qty>1){
            try{
                // const res= await axios.post(
                //     `/api/user/cart/${productToAdd._id}`,
                //     { action: { type: "decrement" } },
                //     {
                //     headers: { authorization: localStorage.getItem("Token") },
                //     }

                const res= await axios.post(
                    `/api/user/cart/${productToAdd._id}`,
                    { action: { type: "decrement" } },
                    {
                    headers: { authorization: stateAuth.token },
                    }
                );
                if(res.status===200){
                    // setCartItems(res.data.cart);
                    console.log("Decremented");
                }

            }
    
        catch(e){
            console.error(e);
        }

        }
        else{
            removeProductFromCart(productToAdd);
        }
        
            
        getItemsOfCart();
    }

    const removeProductFromCart =async (productToRemove,isMoveToWishlist)=>{
        try{
            // const res= await axios({
            //     method: 'delete',
            //     url: `/api/user/cart/${productToRemove._id}`,
            //     headers: { authorization: localStorage.getItem("Token") },

            // });

            const res= await axios({
                method: 'delete',
                url: `/api/user/cart/${productToRemove._id}`,
                headers: { authorization: stateAuth.token },

            });
        }
        catch(e){
            console.error(e);
        }
        getItemsOfCart();
        !isMoveToWishlist && toast("Item Removed from Cart");
    }

    function addToCartHandler(productToAdd){
        stateAuth.isAuth? addItemToCart(productToAdd) : navigate("/login");
    }

    useEffect(()=>{
        getItemsOfCart();
    },[]);

    return(

    <CartContext.Provider value={{addToCartHandler,getItemsOfCart,cartItems,setCartItems,itemInCartFlag,incrementCartQuantity,decrementCartQuantity,removeProductFromCart,isLoading,inputedDiscountCode,setInputedDiscountCode,discountPercent, setDiscountPercent,discountHandler}}>
        {children}
    </CartContext.Provider>
    
    )
    
}