import Profile from "./Profileclass";
import { Outlet } from "react-router-dom";
import Profilefunction from "./profile";
import SocialProfileClass from "./Socialprofileclass";
const About =() =>{
return(
    <div className="w-[100vh]  m-5 border border-black border-2px shadow-2xl justify-center mx-auto m">
        <span className="text-4xl font-bold m-4 justify-center flex underline">
        About Me
        </span>
        {/* <Profilefunction name = {"Sahil"}/> */}
        <Profile name = {" Sahil"} />
        <p className="m-3 font-bold text-gray-600 justify-center">  Frontend Developer who is passionate about developing web apps from scratch using modern tools & technology's seeking & open for opportunity, Eager to Leverage Skills and Drive Innovation.</p>
    <SocialProfileClass/>
        <h3 className="m-3 font-bold text-yellow-400 justify-center">Tools & Technology:  </h3>
        <ul>
            <li className="ml-7 p-1 font-bold text-gray-500 justify-center list-disc">Programming Languages: HTML, CSS, JavaScript </li>
            <li className="ml-7 p-1 font-bold text-gray-500 justify-center list-disc">Frontend Framework: React </li>
            <li className="ml-7 p-1 font-bold text-gray-500 justify-center list-disc">Version Control: Git </li>
        </ul>
    </div>


);
};
export default About 