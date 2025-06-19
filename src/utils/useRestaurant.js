import { useState , useEffect } from "react"
import { MENU } from "../components/constants"
const useRestaurant = (resId)=>{
    const[resMenu , setResMenu] = useState(null)
    useEffect(()=>{
        getMenu()
    },[])
    async function getMenu(){
        const URL = await fetch(MENU + resId);
        const json = await URL.json()
        console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2])
        setResMenu(json?.data)
    }
    return resMenu;
}
export default useRestaurant;