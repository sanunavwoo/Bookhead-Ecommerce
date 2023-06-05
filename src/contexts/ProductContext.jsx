import {createContext,useEffect, useState} from "react";

export const ProductContext= createContext();

export function ProductContextProvider({children}){

    const [allProducts,setAllProducts]= useState([]);
    const [isLoading,setIsLoading]= useState(false);

    const getData= async ()=>{
        setIsLoading(true);
        const res= await fetch("/api/products");
        console.log("data response",res.data);
        if(res.status===200){
            try{
                const data= await res.json();
                setAllProducts(data.products);
                setIsLoading(false);
            }
            catch(e){
                console.error(e);
            }
        }
    }

    console.log(allProducts);

    useEffect(()=>{
        getData();
    },[]);

    return(<>
        <ProductContext.Provider value={{allProducts, isLoading}} >
         {children}
        </ProductContext.Provider>
    </>);
}