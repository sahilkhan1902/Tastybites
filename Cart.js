import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "./constants";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
// import { clearItem } from "../Utils/CartSlice";
import { clearItem } from "../utils/CartSlice";
const Cart = ()=>{
    const cartItems = useSelector((store)=> store.cart.items)
    console.log(cartItems)
    const dispatch = useDispatch()
    function clearItemFunc (){
        dispatch(clearItem())
        toast.error("All item removed")
    }
    return(<> {cartItems.length > 0 ? (  <div className="md:w-3/5 w-[80%]  m-auto py-4 min-h-screen ">
    <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-semibold">Cart ({cartItems.length})</h1>
    <button className="text-xs font-medium bg-red-300 py-1 px-2 hover:bg-red-400 transition-all duration-300 ease-in-out rounded" onClick={()=>clearItemFunc()}>Clear Cart</button>
    </div>
    <div className="flex flex-col ">
    {
cartItems.map(item=>{
    return <CartItem key={item?.card?.info?.id} {...item?.card?.info}/>
})
}
  
    </div>
  
</div> ) : (<div className="h-screen flex flex-col justify-center items-center my-auto">
    <h1 className="text-4xl">Cart Empty</h1>
    <Link to={"/"}>
      <button className="bg-yellow-500 m-2 rounded-xl p-3">
        Shop Now
      </button>
    </Link>
  </div> )}
        
      
        </>
    )
}
const CartItem = ({name,imageId,price,description})=>{
    return(
        <div className="my-2 border-b py-2 md:flex-row flex flex-col text-sm  gap-8">
            <img
                  src={
                   imageId ? (IMG_CDN_URL + imageId) : "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/39cd5e4824e5c011ffaf56ddc39891e8"
                  }
                  alt=""
                  className="w-32 h-20 rounded object-cover"
                />
            <div className="flex flex-col">
            <span className="font-semibold">{name}</span>
            <span className="font-semibold">&#8377;{!price ? '250' : price/100}</span>
            <span className="text-sm text-gray-500">{description}</span>
            </div>
        </div>
    )
}
export default Cart;