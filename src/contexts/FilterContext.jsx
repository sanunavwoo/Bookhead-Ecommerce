import {createContext, useReducer,useState} from "react";
import { filterReducerFunc } from "../reducers/filterReducer";



const initialState= {
    sort:"",
    genre:"",
    rating:"",
    searchedValue:""
};
export const FilterContext= createContext(initialState);

export function FilterContextProvider({children}){

    

    const [filterState, filterDispatch]= useReducer(filterReducerFunc,
        {
            sort:"",
            genre:[],
            rating:"",
            searchedValue:""
        }
    );
    

    // console.log("IsRating checked: ",isRatingChecked);
    return(
    <>
        <FilterContext.Provider value={{filterState,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    </>);
}