
import { useState } from "react";
import contact from "/assets/contact.jpg";


const Contact = () => {
  const [message, setMessage] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
    }
  return (
    <div className="flex m-5 justify-around">
      
      <div className="mt-5 border-2 rounded p-3 border-yellow-200 bg-gray-100 shadow-lg">
      <h1 className="text-4xl ml-10 font-bold mb-5">Contact us</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input className=" m-3 px-8 py-2 w-5/6 border-2 rounded focus:outline-amber-300" type="text" placeholder="Name" required/>
                    <input className="-3 px-8 py-2 w-5/6 border-2 rounded focus:outline-amber-300" type="email" placeholder="Email" required/>
                    <textarea className="m-3 pt-4 pl-4 w-5/6 border-2 rounded focus:outline-amber-300" placeholder="Type your Message here..." required></textarea>
                    <button className=" mt-4 mb-3  bg-yellow-500 rounded cursor-pointer w-1/3  mx-2 my-auto inline" type="submit">Submit</button>
                    {message && <span>Thanks for contacting Tasty Bites, We'll Contsct ASAP.</span>}
                </form>
      </div>
      <div className="">
      <img className="h-96 w-2/3 ml-12" src={contact} alt="" />
      </div>
    </div>
  );
};

export default Contact;