import React, { useContext } from 'react';
import { authContext } from "../../App";
import { LoginDetails } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiArrowCircleLeft } from "react-icons/hi";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { FaChartLine } from "react-icons/fa";
import { AiOutlineAudit } from "react-icons/ai";
import { BiMessageEdit } from "react-icons/bi";
import { GoHistory } from "react-icons/go";
import { IoMdSettings,IoMdLogOut } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";

interface Sidebar {
  title: string,
  path: string,
  icon?: JSX.Element,
  spacing?: boolean,
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => { setOpen(true); };
  const handleMouseLeave = () => { setOpen(false); };
  let Menus: Array<Sidebar> = [
    { title: "Dashboard", path: "/" },
    { title: "Audits", icon: <AiOutlineAudit />, path: "/audit" },
    { title: "Locations", icon: <FaLocationDot />, path: "/locations" },
  ];

  const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;

  if(userRole === "HOD") {
    Menus.push({ title: "Add Stock", icon: <MdPostAdd />, path: "/addstock" });
    Menus.push({ title: "Add User ", icon: <RiAccountCircleFill/>, spacing: true, path: "/AddUser" });
    Menus.push({ title: "AuditSelect", icon: <BiMessageEdit />, spacing: true, path: "/Auditselect" });
  }

  if(userRole === "CDN") {
    Menus.push({ title: "Add Stock", icon: <MdPostAdd />, path: "/addstock" });
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/logout`; 
    navigate(path);
  }

  return (
    <div>
      <div className={`bg-custom-black text-custom-white selection:text-white h-full p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <HiArrowCircleLeft className={`bg-white text-black text-3xl rounded-full cursor-pointer absolute -right-3 top-9 border border-black rotate-${open ? '0' : '180'}`} />
        <div className="inline-flex">
          <h2 className={`w-9.5 h-10 text-2xl rounded-full float-left font-medium `} />
          <h1 className={` text-right pl-5 pt-1   font-mono text-2xl duration-300 ${!open && "scale-0"}`}></h1>
          <h3 className={` text-right mr-2 text-3xl ${!open && "hidden"}`}>MENU</h3>
        </div>
        <div className="flex items-centre rounded-full bg-transparent border border-custom-white mt-4 px-2 py-2">
          <GoSearch className={` cursor-pointer float-left text-2xl `} onClick={() => setOpen(!open)} />
          <input type={"search"} className={`text-base  bg-transparent focus:outline-none mr-2 ${!open && "hidden"}`} />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li key={index} className={`rounded-md  text-sm flex items-scentre gap-x-4 cursor pointer p-2 hover:text-custom-black hover:bg-custom-yellow ${menu.spacing ? "mt-4" : "mt-5"}`}>
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

