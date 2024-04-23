import React from 'react'
import { Sidebar , Header} from '../Imports'
import { FaComputer } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Audit = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/stockaudit`; 
    navigate(path);
  }
	return (
<div className="flex">
  <Sidebar />
  <div className="flex flex-col flex-1">
    <div className="container mx-auto mt-8 flex">
      <h1 className="font-extrabold text-3xl mr-auto">Stock Audits</h1>
      <button className={`hover:outline outline-slate-200 rounded-xl ml-auto bg-slate-200 hover:bg-slate-300 px-4`} onClick={routeChange}>New Audit</button>
    </div>
    <div className="container mx-auto mt-8">
      <input
        className="w-full rounded bg-slate-200 placeholder:text-center hover:bg-slate-300 py-1 px-4"
        type="text"
        placeholder="Search by product name or Location"
      />
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

