import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

import { WishlistContext } from "../../contexts/WishlistContext";


import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export function ProductCard(props){
    const {addToCartHandler,itemInCartFlag}= useContext(CartContext);
    const {AddToWishlistHandler,itemInWishlistFlag,removeProductFromWishlist}= useContext(WishlistContext);
   
    // console.log(props);
    const navigate= useNavigate();

    function clickHandler(id){
        // console.log("ID", id);
        navigate(`/products/${id}`);
    }

    return(
        <>
            <div className="product-card-div">
                    <div onClick={()=>clickHandler(props.product._id)} >
                        <img src={props.product.thumbnail} alt="bookImage" />
                        <div style={{textAlign:"left"}}>
                            <div className="titleNrating-div">
                                <p className="title">{props.product.title}</p>
                                <span className="rating">
                                    <span><p>{props.product.rating}</p> <StarOutlinedIcon style={{fontSize:"0.9rem"}} /></span>
                                </span>
                            </div>
                            <p className="author">{props.product.author}</p>
                            <p className="price"><b>Rs. {props.product.price}</b></p>
                        </div>
                    </div>    
                    <button className="add-to-cart" 
                    onClick={()=>(itemInCartFlag(props.product._id)===-1) ? addToCartHandler(props.product): navigate("/cart")}>
                    {itemInCartFlag(props.product._id)===-1 ? 
                    "Add To Cart" : 
                    "Go To Cart"}
                    </button>
                    {/* <button className="add-to-wishlist" onClick={()=>(itemInWishlistFlag(props.product._id)===-1 ? AddToWishlistHandler(props.product) : navigate("/wishlist"))}>{itemInWishlistFlag(props.product._id)===-1 ? "ADD TO WISHLIST":"Go To Wishlist"}</button> */}
                    <span class="wishlist-span">   
                        <button className="add-to-wishlist" onClick={()=>(itemInWishlistFlag(props.product._id)===-1 ? AddToWishlistHandler(props.product) : removeProductFromWishlist(props.product))}>{itemInWishlistFlag(props.product._id)===-1 ? <FavoriteBorderOutlinedIcon />:<FavoriteOutlinedIcon />}</button>
                    </span>
            </div>
            {/* <ToastContainer />  */}
        </>
    );
}