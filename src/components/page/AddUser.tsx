import React ,{useState} from 'react';
import { Sidebar } from '../Imports';



  
const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
	return (
<div className='flex'>
  <Sidebar/>
 <div className=' w-screen'>
 <h2 className="text-4xl font-boldtext-black dark:text-gray-800 mx-60">
    Users
  </h2>
  <h3 className="my-4 text-lg text-gray-600 dark:text-gray-800 mx-60">
    Manage who can View and edit the stock management system
  </h3>
  <form className="w-[55rem] ml-60">
    <label
      htmlFor="default-search"
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-[54rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search For Users"
      />
    </div>
    </form>
  <div className="mx-60 mt-5 ">
    <div className=" p-5 h-16  border flex justify-between ">
      <div>
        {" "}
        <i className="ri-user-line" /> Role
      </div>
      <div>Permissions</div>
    </div>
    <div className=" p-5 h-16  border flex justify-between">
      <div >
        {" "}
        <i className="ri-user-line" /> Head Of Department
      </div>
      <div>View and edit stock info</div>
    </div>
    <div className=" p-5 h-16  border flex justify-between">
      <div>
        {" "}
        <i className="ri-user-line" /> Stock Auditor
      </div>{" "}
      <div>View stock info</div>
    </div>
    <div className=" p-5 h-16  border flex justify-between">
      <div>
        {" "}
        <i className="ri-user-line" /> Stock Custodian
      </div>
      <div>View stock info</div>
    </div>
  </div>
  <h1 className="mx-60 mt-5  font-bold text-3xl">Add Or Remove Users </h1>
  <label
    htmlFor="input-group-1"
    className="block  text-sm font-medium text-gray-900 dark:text-white mx-60"
  >
    Email
  </label>
  <div className="relative mb-6 ">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 ml-60 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 16"
      >
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </svg>
    </div>
    <input
      type="text"
      id="input-group-1"
      className="bg-gray-50 border mx-60  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name@gmail.com"
    />
  </div>
  <div className=' flex ml-[13.6rem] mb-5 mt-2'>

      <div className="relative inline-block text-left">
      <button
        id="dropdownHoverButton"
        onClick={toggleDropdown}
        className="text-white bg-gradient-to-r mx-[11rem] from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  ml-5 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-64"
        type="button"
      >
        Add User
        <svg
          className={`w-2.5 ml-[9rem] h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
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
          className="absolute z-10 w-64 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
        >
          <ul className="py-2 text-sm  text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
           
            <li>
              <a href="#" className="block px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Custodian
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
               Auditor
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
      </div>
  <button
    type="button"
    className="text-white bg-gradient-to-r mx-60 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Add User
  </button>
  <button
    type="button"
    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Remove User
  </button>
 </div>
</div>
	)
}

export default AddUser;
export {};
