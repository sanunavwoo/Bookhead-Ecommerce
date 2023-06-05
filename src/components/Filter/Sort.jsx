import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import "./Filter.css";

export function Sort(){

    const {filterState,filterDispatch}= useContext(FilterContext);
    console.log("Sort:",filterState.sort);
    const handleSort=(option)=>{
        filterDispatch({
            type:option,
            payload:option
        });
    }
    
    return(
        <>
            <div className="category">
                <div className="category-title">
                    Sort By Price
                </div>
                <div className="category-select">
                    <label className="sort-label">
                        <input 
                            onChange= {()=>handleSort("lth")}
                            type="radio" 
                            name="price"
                            value="lth"
                            checked={filterState.sort==="lth"} />
                        <span>Low to High</span>    
                    </label>
                    <label className="sort-label">
                        <input 
                            onChange= {()=>handleSort("htl")}
                            type="radio" 
                            name="price"
                            value="htl"
                            checked={filterState.sort==="htl"} />
                        <span>High to Low</span>    
                    </label>
                </div>
            </div>
        </>
    );
}