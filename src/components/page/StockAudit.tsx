import React from 'react'
import { Sidebar } from '../Imports'
import { FaComputer } from "react-icons/fa6";

const StockAudit = () => {
  return (
    <div className="flex justify-start">
    <Sidebar />
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-row">
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="/audit">
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center">DB LAB</h3>
      <p className="font-extralight text-center">A-414</p>
    </a>
  </div>
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="https://google.com">
      <img
        src="https://bgr.com/wp-content/uploads/2021/12/16-macbook-pro-8.jpg?quality=82&strip=all"
        alt="Macbook Pro"
        className="w-48 h-48 rounded-full object-cover aspect-square p-3 mx-auto"
      />
      <h3 className="font-bold text-center">Macbook Pro</h3>
      <p className="font-extralight text-center">SKU: 123-456-789</p>
    </a>
  </div>
  <div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href="https://google.com">
      <img
        src="https://bgr.com/wp-content/uploads/2021/12/16-macbook-pro-8.jpg?quality=82&strip=all"
        alt="Macbook Pro"
        className="w-48 h-48 rounded-full object-cover aspect-square p-3 mx-auto"
      />
      <h3 className="font-bold text-center">Macbook Pro</h3>
      <p className="font-extralight text-center">SKU: 123-456-789</p>
    </a>
  </div>
</div>
</div>



    
  </div>
);
}


export default StockAudit;
export{};