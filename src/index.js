import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom";
import {ProductContext, ProductContextProvider} from "./contexts/ProductContext"; 
import { FilterContext, FilterContextProvider } from "./contexts/FilterContext";
import { AuthContext,AuthContextProvider } from "./contexts/AuthContext";
import { CartContext,CartContextProvider } from "./contexts/CartContext";
import { WishlistContext,WislistContextProvider } from "./contexts/WishlistContext";
import { AddressContext,AddressContextProvider } from "./contexts/AddressContext";

// Call make Server
makeServer();

export {ProductContext};
export {FilterContext};
export {AuthContext};
export {CartContext};
export {WishlistContext};
export {AddressContext};

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <ProductContextProvider>
      <FilterContextProvider>
      <AuthContextProvider>
      <CartContextProvider>
      <WislistContextProvider>
      <AddressContextProvider>
            <App />
      </AddressContextProvider>      
      </WislistContextProvider>      
      </CartContextProvider>      
      </AuthContextProvider>
      </FilterContextProvider>  
    </ProductContextProvider>  
  </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
