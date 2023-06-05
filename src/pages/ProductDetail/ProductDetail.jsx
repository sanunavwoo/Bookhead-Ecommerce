import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ProductContext } from "../../contexts/ProductContext";
import { Navigation } from "../../components/NavBar/Navigation";
import { FooterComponent } from "../../components/Footer/FooterComponent";
import "./ProductDetail.css";
import { WishlistContext } from "../../contexts/WishlistContext";
import { CartContext } from "../../contexts/CartContext";


export function ProductDetail(){
    const {productID}= useParams();
    console.log("Product ID--", productID);
    const navigate= useNavigate();
//     var selectedProduct={};
//     const getProductDetailById= async ()=>{
//         try{
//             const response= await fetch(`/api/products/${productID}`);
//             const data= await response.json();
//             console.log("Single product: ",data.product);
//             selectedProduct= data.product;
//         }
//         catch(e){
//             console.error(e);
//         }
//     }
//    useEffect(()=>{
//         getProductDetailById();
//    },[productID]);
    
    const {allProducts}= useContext(ProductContext);
    const {itemInCartFlag,addToCartHandler}= useContext(CartContext);
    const {itemInWishlistFlag, AddToWishlistHandler}= useContext(WishlistContext);
    console.log("all products--",allProducts);
     const selectedProduct= allProducts.find(({_id})=>Number(_id)===Number(productID));
    
    console.log("This Product", selectedProduct);

    return(<>
    <Navigation />
            <div className="product-detail-containerPD">
                <div className="product-card-divPD">
                <div className="product-card-left">
                        <img src={selectedProduct.thumbnail} alt="bookImage" />
                </div>    
                    <div className="product-card-right" style={{textAlign:"left"}}>
                        <p className="titlePD">{selectedProduct.title}</p>
                        <p className="authorPD">Author: <span>{selectedProduct.author}</span></p>
                        <p className="pricePD"><b>Rs. {selectedProduct.price}</b></p>
                        <p className="categoryNamePD">Genre: <span>{selectedProduct.categoryName}</span></p>
                        <p className="languagePD">Language: <span>English</span></p>
                        <p className="formatPD">Format: <span>Paperback</span></p>

                        <button className="add-to-cartPD" 
                    onClick={()=>(itemInCartFlag(selectedProduct._id)===-1) ? addToCartHandler(selectedProduct): navigate("/cart")}>
                    {itemInCartFlag(selectedProduct._id)===-1 ? 
                    "Add To Cart" : 
                    "Go To Cart"}
                    </button>
                        <button className="add-to-wishlistPD" onClick={()=>(itemInWishlistFlag(selectedProduct._id)===-1 ? AddToWishlistHandler(selectedProduct) : navigate("/wishlist"))}>{itemInWishlistFlag(selectedProduct._id)===-1 ? "ADD TO WISHLIST":"Go To Wishlist"}</button>
                    </div>
                </div>
            </div>    
        <FooterComponent />
        <ToastContainer />
    </>);
}