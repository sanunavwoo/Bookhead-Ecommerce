import {useContext,useEffect,useState} from "react";
import { CartContext } from "../../contexts/CartContext";
import {Navigation} from "../../components/NavBar/Navigation";
import { ToastContainer, toast } from 'react-toastify';
import {Loader} from "../../components/Loader/Loader";
import "./Cart.css"
import { AuthContext } from "../../contexts/AuthContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";

export function Cart(){

    const navigate= useNavigate();
    const {stateAuth}= useContext(AuthContext);
    const {getItemsOfCart,cartItems,incrementCartQuantity,decrementCartQuantity,removeProductFromCart,isLoading,setInputedDiscountCode,discountPercent, discountHandler}= useContext(CartContext);
    const {itemInWishlistFlag,MoveToWishlistHandler}= useContext(WishlistContext);
    // const [inputedDiscountCode,setInputedDiscountCode]= useState("");
    // const [discountPercent, setDiscountPercent]= useState(0);

    const totalPrice= cartItems?.length>0 && cartItems?.reduce((acc,cur)=>acc+(cur.qty*cur.price),0);
     
    // const discountHandler= ()=>{
    //     if(inputedDiscountCode.trim().toUpperCase()==="BOOKHEAD10"){
    //         setDiscountPercent(0.15);
    //     }
    //     else{
    //         setDiscountPercent(0);
    //     }
    // }
    function getData(){
        getItemsOfCart(); 
    }

    useEffect(()=>{
        getData();
    },[]);

    console.log("CART ITEMS", cartItems);
    
    return(
        <>
            <Navigation isSearchbarVisible="false" />
            <div className="cart-container">
                
            {stateAuth.isAuth===true ?
               <> 
                {cartItems.length>0 ?
                    <>
                            <div className="cart-item-container">
                            <h1>My Cart</h1>
                                {isLoading===true? 
                                    <Loader /> :
                                    <>
                                        {cartItems.map((cartItem)=>(
                                        
                                            <div className="cart-item">
                                                <div className="cart-item-horizontal-info">
                                                    <div className="cart-item-img-div">
                                                        <img src={cartItem.thumbnail} alt="product-img" />
                                                    </div>
                                                    <div className="cart-item-info">
                                                        <p className="cart-item-title">{cartItem.title}</p>
                                                        <p className="cart-item-author">{cartItem.author}</p>
                                                        <p className="cart-item-price">Rs. {cartItem.price}</p>
                                                        <span className="quantity-span">
                                                            <button className="qty-btn minus" onClick={()=>decrementCartQuantity(cartItem)}>-</button>
                                                            <span>{cartItem.qty}</span>
                                                            <button className="qty-btn plus" onClick={()=>incrementCartQuantity(cartItem)}>+</button>
                                                        </span>
                                                    </div>
                                                </div>  
                                                <div className="cart-item-horizontal-btns">
                                                    <div className="card-item-button">
                                                        <button className="remove-btn" onClick={()=>removeProductFromCart(cartItem)}>REMOVE</button>
                                                        <button className="wishlist-btn" 
                                                        onClick={()=>(itemInWishlistFlag(cartItem._id)===-1)? MoveToWishlistHandler(cartItem): navigate("/wishlist")}>{(itemInWishlistFlag(cartItem._id)===-1)? "Move to Wishlist":"Wishlisted"}
                                                        </button>
                                                    </div> 
                                                </div>       
                                            </div>
                                            
                                        ))}
                                    </>    
                                    

                                }
                                    
                            </div>
                            <div className="price-card-container">
                                <div className="price-coupon">
                                    <input
                                    type="text"
                                        placeholder="Have a Coupon?"
                                        onChange={(e)=>setInputedDiscountCode(e.target.value)}
                                    />
                                    <button onClick={()=>discountHandler()} disabled= {discountPercent>0?true:false} >Apply</button>
                                </div>
                                <h4>PRICE DETAILS</h4>
                                <div className="price-breakdown-div">
                                    <li>
                                        <ul>
                                            <p>Price ({cartItems.length})</p>
                                            <p>Rs. {totalPrice}</p>
                                        </ul>
                                        <ul>
                                            <p>Sale Discount</p>
                                            <p>- Rs. 0</p>
                                        </ul>
                                        <ul>
                                            <p>Delivery Charges</p>
                                            <p>FREE <s>Rs.100</s></p>
                                        </ul>
                                        <ul>
                                            <p>Coupon Discount</p>
                                            <p className="greenLine">- Rs. {Math.round(totalPrice*discountPercent)}</p>
                                        </ul>
                                    </li>
                                    <div className="totalAmount-div">
                                        <span><h4>Total Amount</h4></span>
                                        <span><h4 className="greenLine">Rs. {Math.round(totalPrice- (totalPrice*discountPercent))}</h4></span>
                                    </div>
                                    <p className="save-msg-p">{discountPercent>0 && `You will save Rs. ${Math.round(totalPrice*discountPercent)} on this order`}</p>
                                    <button className="checkout-btn" onClick={()=>navigate("/checkout")}>CHECKOUT</button>
                                </div>
                            </div>
                    </>
                    :
                    <div className="empty-cart">
                        <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="Empty cart image" />
                        <h1>Empty <span>Cart</span></h1>
                        
                    </div>
                
                }
                    
                </>              
                 :
                
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