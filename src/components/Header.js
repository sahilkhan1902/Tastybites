import { useState } from "react";
import Logo from "/assets/logo.jpeg";
import { Link } from "react-router-dom";
import Title from "./Title";
import useOnline from "../utils/useOnline";
import useAuth from "../utils/useAuth";
import { useSelector } from "react-redux";


const Header = () => {
  // const [ isloggedin, setisLoggedin] = useState(false);
  const isOnline = useOnline();
  const { isloggedin, handleLogin, handleLogout } = useAuth();
  const cartItems = useSelector(store => store.cart.items)
    return (
      <div className="flex justify-between items-center px-6 md:px-8 py-2 shadow bg-yellow-400 text-white">
       <Link to="/">
                <img className="h-16" data-testid='logo' src={Logo} alt="" />
            </Link>
       
          <ul  className="flex gap-6 md:gap-12 text-sm font-medium">
          <li><Link to="/" className=" hover:text-orange-900 hover:bg-gray-200 hover:rounded-full px-1  transition-all duration-300 ease-in-out ">Home</Link></li>
                <li><Link to="/about" className=" hover:text-orange-900 hover:bg-gray-200 hover:rounded-full px-1  transition-all duration-300 ease-in-out">About</Link></li>
                <li><Link to="/contact" className=" hover:text-orange-900 hover:bg-gray-200 hover:rounded-full px-1  transition-all duration-300 ease-in-out">Contact</Link></li>
                <li><Link to="/cart" className="relative "><i className="fa-solid fa-cart-shopping"><span className="absolute top-[-8px] right-[-12px] bg-white text-yellow-400 w-4 p-1  h-4 rounded-full text-[10px] flex justify-center items-center" data-testid="cart">{cartItems.length}</span></i></Link></li>
                {/* <li><Link to="/instamart" className=" hover:text-orange-400 transition-all duration-300 ease-in-out">Instamart</Link></li> */}
          </ul>
         
       
       {/* <h1 className="heads">{isOnline?" 🟢":"🔴"}</h1>
       
       {isloggedin ? (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      )} */}
      </div>
      

    );
  };

  export default Header