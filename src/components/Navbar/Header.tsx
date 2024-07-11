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
  let nav = useNavigate(); 
  const routec = () =>{ 
    let path = `/profile`; 
    navigate(path)
  }

  return (
   
<div className="w-full h-14 bg-custom-black ">
  <div className="flex flex-row-reverse "> 
  <div>
    <RiAccountCircleFill className={`s text-custom-white bg-custom-gray text-5xl cursor-pointer hover:shadow-lg rounded-full `} onClick={toggleDropdown}> </RiAccountCircleFill>
    {showDropdown && (
  <div className="absolute z-10 top-12 right-0 bg-custom-gray text-custom-white shadow rounded-md">
    <ul>
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