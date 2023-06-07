import {Routes, Route} from "react-router-dom";
import "./App.css";

import Mockman from "mockman-js"
import {Landing} from "./pages/LandingPage/Landing";
import {Products} from "./pages/ProductPage/Products";
import {Cart} from "./pages/CartPage/Cart";
import {ProductDetail} from "./pages/ProductDetail/ProductDetail";
import { Login } from "./pages/LoginPage/Login";
import { Logout } from "./pages/LogoutPage/Logout";
import { Profile } from "./pages/ProfilePage/Profile";
import { Signup } from "./pages/SignupPage/Signup";
import { Wishlist } from "./pages/WishlistPage/Wishlist";
import { Checkout } from "./pages/CheckoutPage/Checkout";


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} alt="mockBee logo" width="180" height="180" />
        <h1 className="brand-title">
          Welcome to <span>mockBee!</span>
        </h1>
        <p className="brand-description">
          Get started by editing <code>src/App.js</code>
        </p>
        <div className="links">
          <a
            href="https://mockbee.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Explore mockBee
          </a>
          <a
            href="https://mockbee.netlify.app/docs/api/introduction"
            target="_blank"
            rel="noreferrer"
          >
            API Documentation
          </a>
          <a
            href="https://github.com/neogcamp/mockBee"
            target="_blank"
            rel="noreferrer"
          >
            Contribute
          </a>
        </div>
      </header> */}

      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productID" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />        
        <Route path="/signup" element={<Signup />} />  
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
