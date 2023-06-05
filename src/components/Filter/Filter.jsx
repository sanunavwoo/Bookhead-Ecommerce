import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import "./Filter.css";
import { Genre } from "./Genre";
import { Rating } from "./Rating";
import { Sort } from "./Sort";

export function Filter(){

    const {filterState, filterDispatch}= useContext(FilterContext);
    
    function clearHandler(){
        filterDispatch({
            type:"Clear"
            
        });

        
    }

    console.log("after clear filter--", filterState);
    return(
        <>
            <aside className="filter-container">
                <div className="filter-container-title">
                    <span>Filter</span>
                    <button className="clear" onClick={clearHandler} >Clear</button>
                </div>
                <div className="filters">
                    <Sort />
                    <Genre />
                    <Rating />
                </div>
            </aside>
        </>
    );
} 