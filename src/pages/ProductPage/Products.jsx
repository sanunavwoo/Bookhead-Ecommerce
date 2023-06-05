import { useEffect,useState,useContext } from "react";
import { getAllProductsHandler } from "../../backend/controllers/ProductController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {products} from "../../backend/db/products"
import { Filter } from "../../components/Filter/Filter";
import { FooterComponent } from "../../components/Footer/FooterComponent";
import { Navigation } from "../../components/NavBar/Navigation";
import { Loader } from "../../components/Loader/Loader";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { FilterContext } from "../../contexts/FilterContext";
import { ProductContext } from "../../contexts/ProductContext";


import "./Products.css"
export function Products(){
    
    const {allProducts,isLoading}= useContext(ProductContext);
    const {filterState}= useContext(FilterContext);

    // console.log("Initial Filter State--", filterState);

    function getSortedProducts(allProducts, sort){
        const sortedProducts= [...allProducts].sort((item1,item2)=>sort==="lth"?item1.price-item2.price : sort==="htl"? item2.price-item1.price : allProducts);
        
        return sortedProducts;
    }
    const sortedProducts= getSortedProducts(allProducts,filterState.sort);
    
    function getProductsByGenre(products, genre){
        const genreProducts= [...products].filter((product)=>genre.length>0 ? genre.includes(product.categoryName) : product);
        return genreProducts;
    }
    const genreProducts= getProductsByGenre(sortedProducts, filterState.genre);
    // console.log("Genre: ",filterState.genre);

    function getProductsByRating(products,rating){
        const ratingWiseProducts= [...products].filter((product)=>rating? Number(product.rating)>Number(rating): product);
        return ratingWiseProducts;
    }
    const ratingWiseProducts= getProductsByRating(genreProducts, filterState.rating);
    console.log("Rating wise products::::", ratingWiseProducts);

    function getSearchedProducts(products,searchedItem){
        const searchedProduct= [...products].filter((product)=>searchedItem.length>0 ?product.title.toLowerCase().includes(searchedItem.toLowerCase()):product);
        return searchedProduct;
    }
    
    const searchedProduct= getSearchedProducts(ratingWiseProducts,filterState.searchedValue);
    
    return(
        
    <>
        <Navigation isSearchbarVisible="true" />
        
       
            <Filter />
        

            <div className="product-container">
            {isLoading? <Loader /> : 
            <>
                {(searchedProduct) && (searchedProduct.length>0) &&
                    searchedProduct.map((product)=>
                        (
                            <ProductCard product={product} />
                        
                        )
                    )
                    }
            </>}
                
            </div>

        <ToastContainer autoClose={2000} position="bottom-right" />  
        
        
        
        

    </>);
}

{/* <ProductCard id={product._id} key={product._id} rating={product.rating} categoryName={product.categoryName} thumbnail={product.thumbnail} title={product.title} author={product.author} price={product.price} /> */}