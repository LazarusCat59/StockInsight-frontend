import React from 'react'
import { Sidebar } from '../Imports'
import { useNavigate } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";

const StockAudit = () => 
  
  {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/newaudit`; 
    navigate(path);
  }
  return (
    <div className="flex justify-start">
    <Sidebar />
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-row">
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="/newaudit">
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto" onClick={routeChange}/>
      <h3 className="font-bold text-center">DB LAB</h3>
      <p className="font-extralight text-center">A-414</p>
    </a>
  </div>
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="/newaudit">
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto" onClick={routeChange}/>
      <h3 className="font-bold text-center">MP LAB</h3>
      <p className="font-extralight text-center">A-415</p>
    </a>
  </div>
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="/newaudit">
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto" onClick={routeChange}/>
      <h3 className="font-bold text-center">NET LAB</h3>
      <p className="font-extralight text-center">A-407</p>
    </a>
  </div>
</div>
</div>



    
  </div>
);
}


export default StockAudit;
export{};