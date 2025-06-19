import { useState } from "react";
const profile =(props)=>{
    const [count, setCount] = useState(0)
    return(
        <div>
            <h1>Profile Component</h1>
           <h3> Name :  {props.name}</h3>
        <h3> Count : {count}</h3>
        <button onClick={()=> setCount(1)}> Button</button></div>
    )
}
export default profile;