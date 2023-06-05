import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import "./Filter.css";


export function Genre(){
    const {filterState, filterDispatch}= useContext(FilterContext);

    function handleGenre(event,option){
        const check= event.target.checked;
        filterDispatch({
            type: "GENRE",
            payload:{
                option,
                check
            }
        });
    }
    // console.log("Genre: ",filterState.genre);

    return(
        <>
            <div className="category">
                <div className="category-title">
                    Genre
                </div>
                <div className="category-select">
                    <label className="sort-label">
                        <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleGenre(e,"Fiction")}
                            checked={filterState.genre.includes("Fiction")}  

                            />
                        <span>Fiction</span>    
                    </label>
                    <label className="sort-label">
                        <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleGenre(e,"Non-Fiction")}
                            checked={filterState.genre.includes("Non-Fiction")}
                            />
                        <span>Non-Fiction</span>    
                    </label>
                    <label className="sort-label">
                        <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleGenre(e,"Self-Help")}
                            checked={filterState.genre.includes("Self-Help")}

                            />
                        <span>Self-Help</span>    
                    </label>
                </div>
            </div>
        </>
    );
}