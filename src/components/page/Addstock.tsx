import React, { useState } from 'react'
import { Sidebar } from '../Imports'
import Inputbox from '../elements/Inputbox'
import But from '../elements/But';

const Addstock = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex' >
      <Sidebar/>
      <div>
        <div className='flex justify-center w-[85rem] mt-3'>
          <div className='bg-slate-200 border rounded-full h-36 w-36'></div>
        </div>  
        <div className='flex justify-center items-center w-[85rem] '>
       <Inputbox ph="stock name" tag="Name : " />
       </div>

      <div className='mx-80 mt-2'>
        <h1 className='text-xl font-semibold  '> Stock Details:</h1>
        <div className='flex '>
          <div className='mr-36'>
          <Inputbox ph="type" tag="Type :"/>
            <Inputbox ph="description" tag="Desc :"/>
            <Inputbox ph="dd/mm/yyyy (Purchase Date)" tag="Date :"/>
            </div>
            <div >
            <Inputbox ph="item code" tag="Code :"/>
            <Inputbox ph="bill number" tag="BillNo: "/>
            <div className='ml-5'>
            <Inputbox ph="location" tag=" Loc : "/></div>
            </div>
          <div>
          </div>
        </div>

      </div>
      <div className='flex '>
      

      <div className=' flex  mt-5'>
        <label htmlFor="message" className="text-xl ml-[18rem] font-semibold ">
  Remarks :
</label>
<textarea
  id="message"
  rows={4}
  className="block p-2.5 w-[18rem] text-sm ml-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400"
  placeholder="Description"
></textarea>

        </div>

        <div className=' flex ml-[4rem] mt-10'>
      <h1 className=' text-xl font-semibold'>Condition :</h1>

      <div className="relative inline-block text-left">
      <button
        id="dropdownHoverButton"
        onClick={toggleDropdown}
        className="text-white bg-gradient-to-r mx-[11rem] from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 ml-5 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Condition
        <svg
          className={`w-2.5 ml-12 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="Condition"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Good
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Bad
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Average
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
      </div>
   
      </div>
      <div className='mt-5 ml-[24.5rem]'>
      <button
    type="button"
    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
  >
    Submit
  </button>
      </div>
    </div>

      
    </div>
  )
}

export default Addstock
