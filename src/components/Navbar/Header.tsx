import React, { useState } from 'react'
import { RiAccountCircleFill } from "react-icons/ri";
import {IoMdLogOut} from "react-icons/io"
import { useNavigate,BrowserRouter,Route } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

const toggleDropdown = () => {
  setShowDropdown(!showDropdown);
};

let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/logout`; 
    navigate(path);
  }

  return (
   
<div className="w-full h-14 bg-blue-950 ">
  <div className="flex flex-row-reverse "> 
  <div>
    <RiAccountCircleFill className={`s text-white text-5xl cursor-pointer hover:shadow-lg rounded-full `} onClick={toggleDropdown}> </RiAccountCircleFill>
    {showDropdown && (
  <div className="absolute z-10 top-12 right-0 bg-white shadow rounded-md">
    <ul>
      <li className={`flex items-center p-2 cursor-pointer hover:border border-black rounded-md ease-in `}>
      <RiAccountCircleFill className="mr-2 text-2xl" />
      Profile
      </li>
      <li className={`flex items-center p-2 cursor-pointer hover:border border-black rounded-md ease-in `}>
      
      <IoMdLogOut className={`mr-2 text-2xl`} onClick={routeChange}> </IoMdLogOut> 
      
      Logout
      </li>
      
    </ul>
  </div>
  
)}
</div>
  </div>
</div>


     
  )
}


export default Header
export{}; 