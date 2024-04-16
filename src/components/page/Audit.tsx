import React from 'react'
import { Sidebar , Header} from '../Imports'
import { FaComputer } from "react-icons/fa6";

const Audit = () => {
	return (
<div className="flex">
  <Sidebar />
  <div className="flex flex-col flex-1">
    <div className="container mx-auto mt-8 flex">
      <h1 className="font-extrabold text-3xl mr-auto">Stock Audits</h1>
      <button className="hover:outline outline-slate-200 rounded-xl ml-auto bg-slate-200 hover:bg-slate-300 px-4">
        New Audit
      </button>
    </div>
    <div className="container mx-auto mt-8">
      <input
        className="w-full rounded bg-slate-200 placeholder:text-center hover:bg-slate-300 py-1 px-4"
        type="text"
        placeholder="Search by product name or Location"
      />
    </div>
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

    <div className="container mx-auto mt-6">
      <h1 className="text-xl font-extrabold mb-1">Recent Audits</h1>
      <div className="flex my-2">
        <p className="mr-auto">
          <span>2022-01-18 12:30PM</span><br/>
          <span className="text-slate-500 text-sm">Completed 4 days ago</span>
        </p>
        <button className="ml-auto text-sm rounded-xl bg-slate-200 px-4 my-2 hover:bg-slate-300 hover:outline outline-slate-200">
          View Report
        </button>
      </div>

      <div className="flex my-2">
        <p className="mr-auto">
          <span>2022-01-18 12:30PM</span><br/>
          <span className="text-slate-500 text-sm">Completed 4 days ago</span>
        </p>
        <button className="ml-auto text-sm rounded-xl bg-slate-200 px-4 my-2 hover:bg-slate-300 hover:outline outline-slate-200">
          View Report
        </button>
      </div>

      <div className="flex my-2">
        <p className="mr-auto">
          <span>2022-01-18 12:30PM</span><br/>
          <span className="text-slate-500 text-sm">Completed 4 days ago</span>
        </p>
        <button className="ml-auto text-sm rounded-xl bg-slate-200 px-4 my-2 hover:bg-slate-300 hover:outline outline-slate-200">
          View Report
        </button>
      </div>
      
    </div>
    
  </div>
</div>
  )
}


export default Audit 
export {};

