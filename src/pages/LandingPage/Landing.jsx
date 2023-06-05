import {NavLink, useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import {Navigation} from "../../components/NavBar/Navigation";

import { FooterComponent } from "../../components/Footer/FooterComponent";


import "./Landing.css";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";

// src\components\Navigation.jsx
export function Landing(){

    const [categories,setCategories]= useState([]);

    const navigate= useNavigate();
    
    const getData=async ()=>{
        const res= await fetch("/api/categories");
        if(res.status===200){
        try{
            const data= await res.json();
            console.log(data.categories);
            setCategories(data.categories);
        }
        catch(e){
            console.error(e);
        }
    }
    }

    useEffect(()=>{
        getData();
    },[]);

    return(
        <div className="body-container">
            <Navigation />
            <div>
                <div className="hero-div">
                    <div className="hero-img-div">
                        <div className="hero-text">
                            <h1><span>Read your heart out</span></h1>
                            <h1><span>like a </span><span id="bookhead">bookHead</span></h1>
                            <button onClick={()=>navigate("/products")}>EXPLORE</button>
                        </div>
                    </div>
                </div>
                <div className="category-container">
                    <h1 style={{color:"rgba(26, 141, 135)"}}>Categories</h1>
                    <div style= {{display: "flex"}} className="category-div">
                    
                        {categories.map(({_id,categoryName,description})=>(
                            <CategoryCard id={_id} name={categoryName} description={description} />
                        ))}
                    </div>
                    <p className="quotes">Take a good book to bed with you—books do not snore.</p>
                  
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}