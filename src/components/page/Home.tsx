import React from 'react'
import { Sidebar } from '../Imports'

const Home = () => {
  return (
    <div className="flex justify-start ">
      <Sidebar/>
      <h1> 
      <div className="flex flex-col justify-start space-x-96">
  <h1 className=" text-centre text-xl font-bold text-gray-800 p-s ml-4"></h1>
  <div className="mb-8 flex justify-center">
    <div className="flex space-x-16 p-10">
      <div className="container mx-auto rounded-md border border-gray-300">
        <div className="text-center">
          <p className="text-center text-5xl font-bold">5</p>
          <p className="text-center">Pending Audits</p>
        </div>
      </div>
      <div className="container mx-24 rounded-md border border-gray-300">
        <div className="text-center">
          <p className="text-center text-5xl font-bold">5</p>
          <p className="text-center">Unread Requests</p>
        </div>
      </div>
      <div className="container mx-auto rounded-md border border-gray-300">
        <div className="">
          <p className="text-center text-5xl font-bold">5</p>
          <p className="text-center">Total Audits</p>
        </div>
      </div>
      <div className="container mx-auto rounded-md border border-gray-300">
        <div className="text-center">
          <p className="text-center text-5xl font-bold">5</p>
          <p className="text-center">Total Requests</p>
        </div>
      </div>
    </div>
  </div>

  <div className="mb-8 flex flex-col">
    <h2 className="mb-4 text-lg font-medium text-gray-800">Pending Audits</h2>
    <div className="flex flex-col space-y-4">
      <div className="rounded-md bg-white px-4 py-4 shadow-md">
        <h3 className="text-base font-medium text-gray-800">Lab 1 Inventory</h3>
        <p className="mt-2 text-sm text-gray-600">Status: In Progress</p>
      </div>
      <div className="rounded-md bg-white px-4 py-4 shadow-md">
        <h3 className="text-base font-medium text-gray-800">Lab 2 Inventory</h3>
        <p className="mt-2 text-sm text-gray-600">Status: In Progress</p>
      </div>
      <div className="rounded-md bg-white px-4 py-4 shadow-md">
        <h3 className="text-base font-medium text-gray-800">Lab 3 Inventory</h3>
        <p className="mt-2 text-sm text-gray-600">Status: In Progress</p>
      </div>
    </div>
  </div>
</div>
      </h1>
    </div>
  )
}

export default Home 
export {};