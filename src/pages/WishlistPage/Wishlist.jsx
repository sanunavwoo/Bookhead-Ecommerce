import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Navigation } from "../../components/NavBar/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import "./Wishlist.css";

export function Wishlist(){

    const {GetItemsOfWishlist,itemInWishlistFlag,wishlistItems,MoveToWishlistHandler,removeProductFromWishlist,MoveToCartHandler}= useContext(WishlistContext);
    const {itemInCartFlag,addToCartHandler}= useContext(CartContext);
    const {stateAuth}= useContext(AuthContext);

    const navigate= useNavigate();

    useEffect(()=>{
        GetItemsOfWishlist();
    },[]);
        return(
        <>
            <Navigation />
            
            <div className="wishlist-container">
                {stateAuth.isAuth===true? 
                    <>
                        {wishlistItems.length>0? 
                            <>
                                <div className="headerSection">
                                    <h1>WishList ({wishlistItems.length})</h1>
                                </div>
                                <div className="wishlist-item-container">
                                    {wishlistItems.map((wishlistItem)=>(
                                    
                                        <div className="wishlist-item">
                                            <div className="wishlist-item-horizontal-info">
                                                <div className="wishlist-item-img-div">
                                                    <img src={wishlistItem.thumbnail} alt="product-img" />
                                                </div>
                                                <div className="wishlist-item-info">
                                                    <p className="wishlist-item-title">{wishlistItem.title}</p>
                                                    <p className="wishlist-item-author">{wishlistItem.author}</p>
                                                    <p className="wishlist-item-price">Rs.{wishlistItem.price}</p>
                                                </div>
                                            </div>  
                                            <div className="wishlist-item-horizontal-btns">
                                                <div className="wishlist-item-button">
                                                    <button className="move-to-cart-btn" onClick={()=>MoveToCartHandler(wishlistItem)}>Move to Cart</button>
                                                    <button className="remove-btn" onClick={()=>removeProductFromWishlist(wishlistItem)}>REMOVE</button>
                                                </div> 
                                            </div>       
                                        </div>
                                        
                                    ))}
                                </div>
                            </>
                            :
                            <div className="empty-wishlist">
                                <img src="https://www.pavejewelers.com/assets/images/empty-wishlist.png" alt="Empty wishlist image" />
                                <h1>Empty <span>Wishlist</span></h1>
                            </div>
                        }
                            
    
                    </>:
                    <div className="please-log-in-div">
                        <img src="https://freepngimg.com/download/puppy/33836-7-golden-retriever-puppy-file.png" style={{width: "100%"}} />
                        <h1>PLEASE LOG IN</h1>
                        <div style={{display:"none"}}>{setTimeout(()=>navigate("/login"),1500)}</div>    
                    </div>
                    
                }             
            </div>
            <ToastContainer autoClose={2000} position="bottom-right" />
        </>
    );
}   