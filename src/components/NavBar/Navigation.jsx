import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FilterContext } from "../../contexts/FilterContext";
import { CartContext } from "../../contexts/CartContext";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import "./navbar.css";
import { WishlistContext } from "../../contexts/WishlistContext";

export function Navigation(props){

    const {filterDispatch}= useContext(FilterContext);
    const {stateAuth}= useContext(AuthContext);
    const {cartItems}= useContext(CartContext);
    const {wishlistItems}= useContext(WishlistContext);

    function handleSearch(event){
        console.log(event.target.value);
        filterDispatch({
            type:"SearchedValue",
            payload: event.target.value
        });
    }
    
    return(
        <nav className="navbar">
            <div className="logo-div">
                <NavLink to="/" activeClassName="selected">
                    <h2 style={{fontSize:"1.5rem"}}>bookHead</h2>
                </NavLink>
            </div>
            <div className="searchbar-div">
                {props.isSearchbarVisible==="true" && <input onChange={(e)=>handleSearch(e)} type="text" placeholder="Search Books..." />}
            </div>
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    <NavLink to="/cart" activeClassName="selected"><ShoppingCartIcon style={{fontSize:"1.8rem"}} />{cartItems.length>0 && <span className="quantity">{cartItems.length}</span>}</NavLink>
                </li>
                <li className="navbar-list-item">
                    <NavLink to="/wishlist" activeStyle={{ color: "blue" }}><FavoriteIcon style={{fontSize:"1.8rem"}} />{wishlistItems.length>0 && <span className="quantity">{wishlistItems.length}</span>}</NavLink>
                </li>
                <li className="navbar-list-item">
                    {stateAuth.isAuth===true?<NavLink to="/logout" activeClassName="selected"><LogoutIcon style={{fontSize:"1.8rem"}} /></NavLink> : <NavLink to="/login" activeClassName="selected"><LoginIcon style={{fontSize:"1.8rem"}} /></NavLink>}
                </li>
                <li className="navbar-list-item">
                    <NavLink to="/profile" activeStyle={{ color: "blue" }}><PersonOutlineIcon style={{fontSize:"1.8rem"}} /></NavLink>
                </li>
            </ul>

        </nav>
 
    );
}