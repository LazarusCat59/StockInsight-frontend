import React from 'react'
import { Sidebar } from '../Imports'

const Audit = () => {
	return (
<>
	<Sidebar/>
  <div className="container mx-auto mt-8 flex ">
    <h1 className="font-extrabold text-3xl mr-auto">Stock Audits</h1>
    <button className="hover:outline outline-slate-200 rounded-xl ml-auto bg-slate-200 hover:bg-slate-300 px-4">
      New Audit
    </button>
  </div>
  <div className="container mx-auto mt-8 flex grid-flow-row">
    <input
      className="flex-auto rounded bg-slate-200 placeholder:text-center  hover:bg-slate-300 py-1"
      type="text"
      placeholder="Search inventory by name or SKU"
    />
  </div>
  <div className="container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-flow-row mx-auto mt-8">
    <a
      className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300"
      href="https://google.com"
    >
      <img
        src="https://bgr.com/wp-content/uploads/2021/12/16-macbook-pro-8.jpg?quality=82&strip=all"
        alt="Macbook Pro"
        className="rounded-full object-cover aspect-square p-3"
      />
      <h3 className="font-bold text-center">Macbook Pro</h3>
      <p className="font-extralight text-center">SKU: 123-456-789</p>
    </a>
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
  </div>
</>
	)
}


export default Audit 
export {};

