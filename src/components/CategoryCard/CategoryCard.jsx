import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../contexts/FilterContext";
import "./categoryCard.css";

export function CategoryCard(props){
const {filterDispatch}= useContext(FilterContext);

    const navigate= useNavigate();
    function categoryCardHandler(catName){
        console.log(catName);
        filterDispatch({
            type: "GENRE",
            payload:{
                option: catName,
                check: true
            }
        });

        navigate("/products");
    }

    return(

    <div key={props.id} className="category-card-div" onClick= {()=>categoryCardHandler(props.name)}> 
        <h2 key={props.id}>
            {props.name}
        </h2>
        <p>{props.description}</p>
    </div>
    );
}