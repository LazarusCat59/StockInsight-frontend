import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiArrowCircleLeft } from "react-icons/hi";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { FaChartLine } from "react-icons/fa";
import { AiOutlineAudit } from "react-icons/ai";
import { BiMessageEdit } from "react-icons/bi";
import { GoHistory } from "react-icons/go";
import { IoMdSettings,IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => { setOpen(true); };
  const handleMouseLeave = () => { setOpen(false); };
  const Menus = [
    { title: "Dashboard", path: "/" },
    { title: "Reports", icon: <FaChartLine />, path: "/reports" },
    { title: "Audits", icon: <AiOutlineAudit />, path: "/audit" },
    { title: "Requests", icon: <BiMessageEdit />, spacing: true, path: "/request" },
    { title: "Settings", icon: <IoMdSettings />, spacing: true, path: "/settings" }
  ];

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/logout`; 
    navigate(path);
  }

  return (
    <div>
      <div className={`bg-blue-950 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <HiArrowCircleLeft className={`bg-white text-black text-3xl rounded-full cursor-pointer absolute -right-3 top-9 border border-black rotate-${open ? '0' : '180'}`} />
        <div className="inline-flex">
          <h2 className={`w-9.5 h-10 text-2xl rounded-full float-left font-medium `} />
          <h1 className={` text-right pl-5 pt-1 text-white  font-mono text-2xl duration-300 ${!open && "scale-0"}`}></h1>
          <h3 className={`text-white text-right mr-2 text-3xl ${!open && "hidden"}`}>MENU</h3>
        </div>
        <div className="flex items-centre rounded-full bg-transparent border border-white mt-4 px-2 py-2">
          <GoSearch className={`text-white cursor-pointer float-left text-2xl `} onClick={() => setOpen(!open)} />
          <input type={"search"} className={`text-base text-white bg-transparent focus:outline-none mr-2 ${!open && "hidden"}`} />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li key={index} className={`rounded-md text-white text-sm flex items-scentre gap-x-4 cursor pointer p-2 hover:bg-slate-500 ${menu.spacing ? "mt-4" : "mt-5"}`}>
              <Link to={menu.path}>
                <span className="text-2xl float-left block">{menu.icon ? menu.icon : <GoHomeFill />}</span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
    
        
      </div>
    </div>
  )
}

export default Navbar;

