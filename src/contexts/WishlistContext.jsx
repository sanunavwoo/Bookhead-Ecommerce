import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CartContext } from "./CartContext";

export const WishlistContext= createContext();

export function WislistContextProvider({children}){

    const [wishlistItems,setWishlistItems]= useState([]);
    const {stateAuth}= useContext(AuthContext);
    const {removeProductFromCart,addToCartHandler}= useContext(CartContext);
    const navigate= useNavigate();
    const isMoveToCart= false;
    const isMoveToWishlist= false;
    
    const itemInWishlistFlag=(idToFind)=>
        wishlistItems.findIndex(({_id})=>Number(_id)===Number(idToFind));
    
    const AddItemToWishlist= async (productToAdd,isMoveToWishlist)=>{
        const isItemInWishlist= itemInWishlistFlag(productToAdd._id);
        console.log("Wishlist request for: ",productToAdd);
        if(isItemInWishlist===-1){
            try{
                const res= await axios({
                    method: 'post',
                    url: '/api/user/wishlist',
                    headers:{
                        // authorization: localStorage.getItem("Token")
                        authorization: stateAuth.token
                    },
                    data:({
                        product: productToAdd,
                    }),
            });
                if(res.status===201){
                    // console.log("Item added to Wishlist")
                    !isMoveToWishlist && toast("Added to Wishlist");
                }
            }
            
            catch(e){
                console.error(e);
            }
        }
        else{
            alert("Item already in Wishlist");
        }
        

        GetItemsOfWishlist();
    }

    const GetItemsOfWishlist= async ()=>{
        try{
            const res= await axios({
                method:'get',
                url: '/api/user/wishlist',
                headers:{
                    // authorization: localStorage.getItem("Token")
                    authorization: stateAuth.token
                },
                
            });

            if(res.status===200){
                console.log("Wishlist response::",res.data.wishlist);
                setWishlistItems(res.data.wishlist);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    const removeProductFromWishlist= async (productToRemove,isMoveToCart)=>{
        try{
            const res= await axios({
                method:'delete',
                url:`/api/user/wishlist/${productToRemove._id}`,
                headers: { 
                    // authorization: localStorage.getItem("Token") 
                    authorization: stateAuth.token
                },
            });
        }
        catch(e){
            console.error(e);
        }
        !isMoveToCart  && toast("Item Removed from Wishlist");
        GetItemsOfWishlist();
    }

    const AddToWishlistHandler= (productToAdd)=>{
        if(stateAuth.isAuth===true){
            AddItemToWishlist(productToAdd);
        }
        else{
            navigate("/login");
        }
    }
    function getData(){
        GetItemsOfWishlist();
    }

    const MoveToWishlistHandler=(productToMove)=>{
        const isMoveToWishlist= true;
        AddItemToWishlist(productToMove,isMoveToWishlist);
        removeProductFromCart(productToMove,isMoveToWishlist);
        toast("Item moved to Wishlist");
    }
    const MoveToCartHandler=(productToMoveToCart)=>{
        //Add tem to cart
        const isMoveToCart= true;
        addToCartHandler(productToMoveToCart,isMoveToCart);
        //Remove item from wishlist
        
        removeProductFromWishlist(productToMoveToCart, isMoveToCart);
        GetItemsOfWishlist();
        toast("Item moved to cart");
    }
    useEffect(()=>{
        getData();
    },[]);

    return(
        <WishlistContext.Provider value={{AddToWishlistHandler,GetItemsOfWishlist,itemInWishlistFlag,wishlistItems,setWishlistItems,MoveToWishlistHandler,removeProductFromWishlist,MoveToCartHandler}}>
            {children}
        </WishlistContext.Provider>
    );
}