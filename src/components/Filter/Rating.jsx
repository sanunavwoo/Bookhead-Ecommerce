import { useContext, useState } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import "./Filter.css"

export function Rating(){
    const {filterState, filterDispatch}= useContext(FilterContext);
    

    function handleRating(option,valueToSet){
        filterDispatch({
            type: option,
            payload: valueToSet
        });
        
    }
    // console.log("Rating selected--", filterState.rating);
    return(
        <>
            <div className="category">
                <div className="category-title">
                    Rating
                </div>
                <div className="category-select">
                    <label className="sort-label">

                        <input 
                            className="rating-input"
                            type="range" 
                            min= "1"
                            max="4"
                            step="1"
                            name="rating"
                            value={filterState.rating}
                            onChange={(e)=>handleRating("ratingFilter",Number(e.target.value))}
                             

                            />
                        <div className="rating-input-div">
                            <p>1+</p>
                            <p>2+</p>
                            <p>3+</p>
                            <p>4+</p>
                        </div>    
                        {/* <span>{filterState.rating}</span>     */}
                    </label>
                    {/* <label className="sort-label">
                        <input 
                            type="radio" 
                            name="rating"
                            value="2"
                            onChange={(e)=>handleRating("2")}
                            checked={filterState.rating==="2"}
                            />
                        <span>2+</span>    
                    </label>
                    <label className="sort-label">
                        <input 
                            type="radio" 
                            name="rating"
                            value="3"
                            onChange={(e)=>handleRating("3")}
                            checked={filterState.rating==="3"}
                            />
                        <span>3+</span>    
                    </label>
                    <label className="sort-label">
                        <input 
                            type="radio" 
                            name="rating"
                            value="4"
                            onChange={(e)=>handleRating("4")}
                            checked={filterState.rating==="4"}
                            />
                        <span>4+</span>    
                    </label>
  */}
                </div>
            </div>
        </>
    );
}