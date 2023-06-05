import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { FilterContext } from "../../contexts/FilterContext";
import { WishlistContext } from "../../contexts/WishlistContext";

export function Logout(){

    const {stateAuth,dispatchAuth}= useContext(AuthContext);
    const {wishlistItems,setWishlistItems}= useContext(WishlistContext);
    const {cartItems,setCartItems}= useContext(CartContext);
    const {filterDispatch}= useContext(FilterContext);

    const navigate=useNavigate();

    dispatchAuth({
        type: 'USER_LOGOUT',
        payload: {
            user: [],
            token: null,
            isAuth: false 
        }
    });

    filterDispatch({
        type:"Clear"
    })
    // cartItems.map((cartItem)=>removeProductFromCart(cartItem));

    // wishlistItems.map((wishlistItem)=>removeProductFromWishlist(wishlistItem));

    localStorage.removeItem("loginDetails");
     setCartItems([]);
    setWishlistItems([]);

    if(stateAuth.isAuth===false){
        navigate("/");
    }
    console.log("STATE AFTER LOGUT::", stateAuth.userDetails);
    return(
        <>
            <div>
                <h1>
                    Logging out...
                </h1>

            </div>
        </>
    );
}